import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  PartyGroup,
  runInstantRunoff,
  getPartyColor,
  getPartyLabel,
  getPartyCode,
  getScopeBaselineData,
  PreferenceModelDeltas,
  EliminationStage,
  TransferRibbon,
} from '../utils/preferenceEngine';
import { RotateCcw, Info, ArrowRight, Sliders, CheckCircle2, X } from 'lucide-react';

interface SankeyNode {
  x: number;
  y: number;
  h: number;
  votes: number;
  pct: number;
}

interface PreferenceSankeyProps {
  scopeId: string | null;
  scopeTitle: string;
  preferenceDeltas: PreferenceModelDeltas;
  onUpdatePrimaryDelta: (party: PartyGroup, deltaPct: number) => void;
  onBatchUpdatePrimaryDeltas?: (deltas: Partial<Record<PartyGroup, number>>) => void;
  onUpdateTransferFlow: (fromParty: PartyGroup, toParty: PartyGroup, newPct: number) => void;
  onResetDeltas: () => void;
  onClearScope?: () => void;
}

export const PreferenceSankey: React.FC<PreferenceSankeyProps> = ({
  scopeId,
  scopeTitle,
  preferenceDeltas,
  onUpdatePrimaryDelta,
  onBatchUpdatePrimaryDeltas,
  onUpdateTransferFlow,
  onResetDeltas,
  onClearScope,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Active dragging state
  const [activeDrag, setActiveDrag] = useState<{
    type: 'primary' | 'transfer';
    party?: PartyGroup;
    fromParty?: PartyGroup;
    toParty?: PartyGroup;
    startY: number;
    initialVal: number;
  } | null>(null);

  const [hoveredRibbon, setHoveredRibbon] = useState<{
    fromParty: PartyGroup;
    toParty: PartyGroup;
    votes: number;
    pct: number;
    isRetained: boolean;
  } | null>(null);

  // 1. Compute baseline and adjusted data
  const baseline = useMemo(() => getScopeBaselineData(scopeId), [scopeId]);

  const parties: PartyGroup[] = ['ALP', 'COALITION', 'GRN', 'ON', 'OTH'];

  // Calculate current adjusted primaries
  const currentPrimaries = useMemo(() => {
    const res: Record<PartyGroup, number> = { ...baseline.primaryVotes };
    const total = baseline.totalFormalVotes || 1;

    parties.forEach(p => {
      const deltaPct = preferenceDeltas.primaryDeltas[p] || 0;
      if (deltaPct !== 0) {
        res[p] = Math.max(0, res[p] + Math.round((deltaPct / 100) * total));
      }
    });
    return res;
  }, [baseline, preferenceDeltas]);

  // Parties that currently have 0% or dropped off the primary count
  const zeroParties = useMemo(() => {
    return parties.filter(p => (currentPrimaries[p] || 0) <= 0);
  }, [currentPrimaries]);

  // Put a 0% / dropped off party back in with 1% primary, taking evenly from other active parties
  const handlePutPartyBack = (targetParty: PartyGroup) => {
    const totalFormal = baseline.totalFormalVotes || 1;
    // Target is exactly 1.0% of total formal votes
    const targetVotes = Math.max(1, Math.round(0.01 * totalFormal));
    const baselineVotes = baseline.primaryVotes[targetParty] || 0;
    // Delta needed for target party so that: baselineVotes + (delta/100)*totalFormal = targetVotes
    const targetDelta = Number((((targetVotes - baselineVotes) / totalFormal) * 100).toFixed(1));

    // Active other parties currently holding >0% votes
    const activeOtherParties = parties.filter(
      p => p !== targetParty && (currentPrimaries[p] || 0) > 0
    );

    const deltasToApply: Partial<Record<PartyGroup, number>> = {
      [targetParty]: targetDelta,
    };

    if (activeOtherParties.length > 0) {
      // 1.0% is deducted evenly across the other active parties
      const deductionPerParty = Number((1.0 / activeOtherParties.length).toFixed(2));
      activeOtherParties.forEach(p => {
        const currentDelta = preferenceDeltas.primaryDeltas[p] || 0;
        deltasToApply[p] = Number((currentDelta - deductionPerParty).toFixed(2));
      });
    }

    if (onBatchUpdatePrimaryDeltas) {
      onBatchUpdatePrimaryDeltas(deltasToApply);
    } else {
      Object.entries(deltasToApply).forEach(([p, delta]) => {
        onUpdatePrimaryDelta(p as PartyGroup, delta);
      });
    }
  };

  // Put all 0% / dropped off parties back in with 1% primary each, taking evenly from active parties
  const handlePutAllZeroPartiesBack = () => {
    const totalFormal = baseline.totalFormalVotes || 1;
    const activeOtherParties = parties.filter(
      p => !zeroParties.includes(p) && (currentPrimaries[p] || 0) > 0
    );

    if (zeroParties.length === 0 || activeOtherParties.length === 0) return;

    const totalPctToDistribute = zeroParties.length * 1.0;
    const deductionPerParty = Number((totalPctToDistribute / activeOtherParties.length).toFixed(2));

    const deltasToApply: Partial<Record<PartyGroup, number>> = {};

    zeroParties.forEach(targetParty => {
      const targetVotes = Math.max(1, Math.round(0.01 * totalFormal));
      const baselineVotes = baseline.primaryVotes[targetParty] || 0;
      const targetDelta = Number((((targetVotes - baselineVotes) / totalFormal) * 100).toFixed(1));
      deltasToApply[targetParty] = targetDelta;
    });

    activeOtherParties.forEach(p => {
      const currentDelta = preferenceDeltas.primaryDeltas[p] || 0;
      deltasToApply[p] = Number((currentDelta - deductionPerParty).toFixed(2));
    });

    if (onBatchUpdatePrimaryDeltas) {
      onBatchUpdatePrimaryDeltas(deltasToApply);
    } else {
      Object.entries(deltasToApply).forEach(([p, delta]) => {
        onUpdatePrimaryDelta(p as PartyGroup, delta);
      });
    }
  };

  // Calculate current adjusted transfer flows
  const currentTransferFlows = useMemo(() => {
    const res = JSON.parse(JSON.stringify(baseline.transferFlows));
    parties.forEach(src => {
      const overrides = preferenceDeltas.transferOverrides[src];
      if (overrides) {
        if (overrides.toALP !== undefined) res[src].toALP = overrides.toALP;
        if (overrides.toCoalition !== undefined) res[src].toCoalition = overrides.toCoalition;
        if (overrides.toGreens !== undefined) res[src].toGreens = overrides.toGreens;
        if (overrides.toOneNation !== undefined) res[src].toOneNation = overrides.toOneNation;
        if (overrides.toOther !== undefined) res[src].toOther = overrides.toOther;
      }
    });
    return res;
  }, [baseline, preferenceDeltas]);

  // Run full instant-runoff simulation
  const simulation = useMemo(() => {
    return runInstantRunoff(currentPrimaries, currentTransferFlows);
  }, [currentPrimaries, currentTransferFlows]);

  // Sankey Layout Geometry
  const width = 640;
  const height = 340;
  const paddingX = 48;
  const paddingTop = 32;
  const paddingBottom = 28;
  const nodeWidth = 26;
  const usableHeight = height - paddingTop - paddingBottom;
  const gapBetweenNodes = 10;

  // Stages calculation for Sankey nodes & links
  const stageCount = simulation.stages.length;
  const colSpacing = stageCount > 1 ? (width - paddingX * 2 - nodeWidth) / (stageCount - 1) : 100;

  // Calculate (x, y, height) for every candidate in every stage
  const nodePositions = useMemo(() => {
    const positions: Array<
      Record<
        PartyGroup,
        {
          x: number;
          y: number;
          h: number;
          votes: number;
          pct: number;
        }
      >
    > = [];

    simulation.stages.forEach((stage, sIdx) => {
      const stageRecord: Record<
        PartyGroup,
        { x: number; y: number; h: number; votes: number; pct: number }
      > = {} as any;

      const totalStageVotes = stage.candidates.reduce((sum, c) => sum + c.votes, 0) || 1;
      const totalGaps = (stage.candidates.length - 1) * gapBetweenNodes;
      const availableNodeHeight = usableHeight - totalGaps;

      // Sort candidates by a consistent order for visual stability
      const sortedCandidates = [...stage.candidates].sort((a, b) => {
        const order: Record<PartyGroup, number> = {
          ALP: 1,
          GRN: 2,
          OTH: 3,
          ON: 4,
          COALITION: 5,
        };
        return order[a.party] - order[b.party];
      });

      let currentY = paddingTop;
      const x = paddingX + sIdx * colSpacing;

      sortedCandidates.forEach(cand => {
        const h = Math.max(8, (cand.votes / totalStageVotes) * availableNodeHeight);
        stageRecord[cand.party] = {
          x,
          y: currentY,
          h,
          votes: cand.votes,
          pct: cand.percentage,
        };
        currentY += h + gapBetweenNodes;
      });

      positions.push(stageRecord);
    });

    return positions;
  }, [simulation, usableHeight, colSpacing, gapBetweenNodes, paddingX, paddingTop]);

  // Handle Drag Events for mouse and touch
  useEffect(() => {
    if (!activeDrag) return;

    const handleMove = (clientY: number) => {
      const deltaY = clientY - activeDrag.startY;

      if (activeDrag.type === 'primary' && activeDrag.party) {
        // Dragging primary up/down shifts primary share by ~0.1% per pixel (unclamped delta)
        const deltaPct = Number((activeDrag.initialVal - deltaY * 0.1).toFixed(1));
        onUpdatePrimaryDelta(activeDrag.party, deltaPct);
      } else if (
        activeDrag.type === 'transfer' &&
        activeDrag.fromParty &&
        activeDrag.toParty
      ) {
        // Dragging transfer handle: upward increases transfer share
        const deltaPct = Number((activeDrag.initialVal - deltaY * 0.25).toFixed(1));
        const clamped = Math.max(0, Math.min(100, deltaPct));
        onUpdateTransferFlow(activeDrag.fromParty, activeDrag.toParty, clamped);
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientY);
    };

    const handleEnd = () => setActiveDrag(null);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [activeDrag, onUpdatePrimaryDelta, onUpdateTransferFlow]);

  return (
    <div className="flex flex-col gap-4 text-xs font-sans select-none">
      {/* Scope and Info Banner */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Simulating Elimination Preferences For
          </span>
          <span className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap">
            <span>{scopeTitle}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-normal">
              {baseline.seatCount} {baseline.seatCount === 1 ? 'Seat' : 'Seats'}
            </span>
            {scopeId && onClearScope && (
              <button
                onClick={onClearScope}
                className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                title="Clear electorate / regional focus back to statewide"
              >
                <X size={10} />
                <span>Clear Selection</span>
              </button>
            )}
          </span>
        </div>

        <button
          onClick={onResetDeltas}
          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all cursor-pointer"
          title="Reset all custom preference adjustments to official baseline"
        >
          <RotateCcw size={11} />
          <span>Reset Flows</span>
        </button>
      </div>

      {/* Interactive Sankey Canvas */}
      <div className="relative rounded-lg bg-black/40 border border-white/10 p-2 overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[540px] block"
        >
          <defs>
            {/* Gradients for transfers from eliminated parties */}
            {parties.map(from =>
              parties.map(to => (
                <linearGradient
                  key={`grad-${from}-${to}`}
                  id={`grad-${from}-${to}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={getPartyColor(from)} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={getPartyColor(to)} stopOpacity="0.85" />
                </linearGradient>
              ))
            )}
          </defs>

          {/* Stage Headers */}
          {simulation.stages.map((stage, idx) => {
            const x = paddingX + idx * colSpacing + nodeWidth / 2;
            return (
              <g key={`header-${idx}`}>
                <text
                  x={x}
                  y={20}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="bold"
                  className="font-sans tracking-wider uppercase"
                >
                  {stage.stageIndex === 0
                    ? '1. Primary'
                    : idx === simulation.stages.length - 1
                    ? 'Final (2CP)'
                    : `Round ${stage.stageIndex}`}
                </text>
              </g>
            );
          })}

          {/* Inter-Round Exclusion Indicator Header (Between Round Labels) */}
          {simulation.stages.slice(1).map((stage, sIdx) => {
            if (!stage.eliminatedParty) return null;
            const xLeft = paddingX + sIdx * colSpacing + nodeWidth / 2;
            const xRight = paddingX + (sIdx + 1) * colSpacing + nodeWidth / 2;
            const midHeaderX = (xLeft + xRight) / 2;
            const partyColor = getPartyColor(stage.eliminatedParty);

            return (
              <g key={`header-excl-${sIdx}`}>
                <rect
                  x={midHeaderX - 38}
                  y={10}
                  width={76}
                  height={15}
                  rx={3.5}
                  fill="#1E293B"
                  stroke={partyColor}
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />
                <text
                  x={midHeaderX}
                  y={20.5}
                  textAnchor="middle"
                  fill="#F87171"
                  fontSize="8.5"
                  fontWeight="600"
                  className="font-sans"
                >
                  Excl: {getPartyLabel(stage.eliminatedParty)}
                </text>
              </g>
            );
          })}

          {/* Ribbon Flows between consecutive stages */}
          {simulation.stages.slice(1).map((stage, sIdx) => {
            const prevStageIdx = sIdx;
            const nextStageIdx = sIdx + 1;
            const prevPositions = nodePositions[prevStageIdx];
            const nextPositions = nodePositions[nextStageIdx];

            if (!prevPositions || !nextPositions) return null;

            // Track vertical offsets within each node for stacking ribbons
            const fromOffsets: Record<PartyGroup, number> = {
              ALP: 0,
              COALITION: 0,
              GRN: 0,
              ON: 0,
              OTH: 0,
            };
            const toOffsets: Record<PartyGroup, number> = {
              ALP: 0,
              COALITION: 0,
              GRN: 0,
              ON: 0,
              OTH: 0,
            };

            return (
              <g key={`flows-stage-${sIdx}`}>
                {stage.transfers.map((t, tIdx) => {
                  const fromNode = prevPositions[t.fromParty];
                  const toNode = nextPositions[t.toParty];
                  if (!fromNode || !toNode) return null;

                  // Ribbon height at source and target
                  const ribbonSourceHeight = t.isRetained
                    ? fromNode.h
                    : (t.votes / (fromNode.votes || 1)) * fromNode.h;

                  const ribbonTargetHeight = (t.votes / (toNode.votes || 1)) * toNode.h;

                  const x0 = fromNode.x + nodeWidth;
                  const y0 = fromNode.y + fromOffsets[t.fromParty];
                  const x1 = toNode.x;
                  const y1 = toNode.y + toOffsets[t.toParty];

                  fromOffsets[t.fromParty] += ribbonSourceHeight;
                  toOffsets[t.toParty] += ribbonTargetHeight;

                  const dx = (x1 - x0) * 0.5;
                  const pathData = `
                    M ${x0} ${y0}
                    C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}
                    L ${x1} ${y1 + ribbonTargetHeight}
                    C ${x1 - dx} ${y1 + ribbonTargetHeight}, ${x0 + dx} ${y0 + ribbonSourceHeight}, ${x0} ${y0 + ribbonSourceHeight}
                    Z
                  `;

                  const midX = (x0 + x1) / 2;
                  const midY = (y0 + y1) / 2;
                  const isHovered =
                    hoveredRibbon?.fromParty === t.fromParty &&
                    hoveredRibbon?.toParty === t.toParty;

                  return (
                    <g
                      key={`ribbon-${sIdx}-${tIdx}`}
                      onMouseEnter={() =>
                        setHoveredRibbon({
                          fromParty: t.fromParty,
                          toParty: t.toParty,
                          votes: t.votes,
                          pct: t.percentageOfTransfer,
                          isRetained: t.isRetained,
                        })
                      }
                      onMouseLeave={() => setHoveredRibbon(null)}
                      className="transition-opacity duration-150"
                    >
                      <path
                        d={pathData}
                        fill={
                          t.isRetained
                            ? getPartyColor(t.fromParty)
                            : `url(#grad-${t.fromParty}-${t.toParty})`
                        }
                        opacity={t.isRetained ? 0.22 : isHovered ? 0.9 : 0.65}
                        stroke={isHovered ? '#FFFFFF' : 'none'}
                        strokeWidth="0.8"
                        className="cursor-pointer"
                      />

                      {/* Interactive Drag Handle for Transfer Flow Ribbons */}
                      {!t.isRetained && (
                        <g
                          transform={`translate(${midX}, ${midY})`}
                          className="cursor-ns-resize"
                          onMouseDown={e => {
                            e.stopPropagation();
                            setActiveDrag({
                              type: 'transfer',
                              fromParty: t.fromParty,
                              toParty: t.toParty,
                              startY: e.clientY,
                              initialVal: t.percentageOfTransfer,
                            });
                          }}
                          onTouchStart={e => {
                            e.stopPropagation();
                            if (e.touches[0]) {
                              setActiveDrag({
                                type: 'transfer',
                                fromParty: t.fromParty,
                                toParty: t.toParty,
                                startY: e.touches[0].clientY,
                                initialVal: t.percentageOfTransfer,
                              });
                            }
                          }}
                        >
                          <rect
                            x="-16"
                            y="-8"
                            width="32"
                            height="16"
                            rx="4"
                            fill="#1E293B"
                            stroke="#64748B"
                            strokeWidth="1"
                            className="hover:stroke-white transition-colors shadow-sm"
                          />
                          <text
                            x="0"
                            y="3.5"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none font-mono"
                          >
                            {t.percentageOfTransfer}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Candidate Nodes for each stage */}
          {nodePositions.map((stageRecord, sIdx) => {
            const isPrimaryStage = sIdx === 0;

            return (
              <g key={`stage-nodes-${sIdx}`}>
                {Object.entries(stageRecord).map(([partyKey, rawNode]) => {
                  const node = rawNode as SankeyNode;
                  const p = partyKey as PartyGroup;
                  const delta = preferenceDeltas.primaryDeltas[p] || 0;

                  return (
                    <g key={`node-${sIdx}-${p}`}>
                      {/* Node Rectangle */}
                      <rect
                        x={node.x}
                        y={node.y}
                        width={nodeWidth}
                        height={node.h}
                        rx="3"
                        fill={getPartyColor(p)}
                        stroke="#000000"
                        strokeWidth="1"
                        className={isPrimaryStage ? 'cursor-ns-resize hover:brightness-110' : ''}
                        onMouseDown={e => {
                          if (!isPrimaryStage) return;
                          setActiveDrag({
                            type: 'primary',
                            party: p,
                            startY: e.clientY,
                            initialVal: delta,
                          });
                        }}
                        onTouchStart={e => {
                          if (!isPrimaryStage) return;
                          if (e.touches[0]) {
                            setActiveDrag({
                              type: 'primary',
                              party: p,
                              startY: e.touches[0].clientY,
                              initialVal: delta,
                            });
                          }
                        }}
                      />

                      {/* Node Label to the Left of primary stage (Party name) */}
                      {isPrimaryStage ? (
                        <text
                          x={node.x - 6}
                          y={node.y + node.h / 2 + 3}
                          textAnchor="end"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="bold"
                          className="font-sans"
                        >
                          {getPartyLabel(p)}
                        </text>
                      ) : sIdx === nodePositions.length - 1 ? (
                        <text
                          x={node.x + nodeWidth + 6}
                          y={node.y + node.h / 2 + 3}
                          textAnchor="start"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="bold"
                          className="font-sans"
                        >
                          {getPartyLabel(p)} {node.pct}%
                        </text>
                      ) : null}

                      {/* Small percent share value embedded cleanly inside each bar for every round (read-only) */}
                      {node.h >= 11 && (
                        <text
                          x={node.x + nodeWidth / 2}
                          y={node.y + node.h / 2 + (node.h >= 16 ? 3 : 2.5)}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fillOpacity={0.92}
                          fontSize={node.h >= 18 ? '7.5' : '6.5'}
                          fontWeight="600"
                          className="pointer-events-none font-mono tracking-tight select-none"
                        >
                          {node.pct}%
                        </text>
                      )}

                      {/* Draggable interactive percent badge on the 1st (Primary) round */}
                      {isPrimaryStage && (
                        <g
                          transform={`translate(${node.x + nodeWidth / 2}, ${node.y + node.h / 2})`}
                          className="cursor-ns-resize"
                          onMouseDown={e => {
                            e.stopPropagation();
                            setActiveDrag({
                              type: 'primary',
                              party: p,
                              startY: e.clientY,
                              initialVal: delta,
                            });
                          }}
                          onTouchStart={e => {
                            e.stopPropagation();
                            if (e.touches[0]) {
                              setActiveDrag({
                                type: 'primary',
                                party: p,
                                startY: e.touches[0].clientY,
                                initialVal: delta,
                              });
                            }
                          }}
                        >
                          <rect
                            x="-16"
                            y="-8"
                            width="32"
                            height="16"
                            rx="4"
                            fill="#0F172A"
                            stroke={delta !== 0 ? '#F59E0B' : '#64748B'}
                            strokeWidth={delta !== 0 ? '1.2' : '1'}
                            className="hover:stroke-white transition-colors shadow-md"
                          />
                          <text
                            x="0"
                            y="3.5"
                            textAnchor="middle"
                            fill={delta !== 0 ? '#FCD34D' : '#FFFFFF'}
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none font-mono"
                          >
                            {node.pct}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hovered Ribbon Info Tooltip */}
        {hoveredRibbon && (
          <div
            className={`absolute left-2 right-2 ${
              zeroParties.length > 0 ? 'bottom-10' : 'bottom-2'
            } bg-slate-900/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded flex items-center justify-between text-[11px] text-slate-300 pointer-events-none z-10`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getPartyColor(hoveredRibbon.fromParty) }}
              />
              <span className="font-semibold text-white">
                {getPartyLabel(hoveredRibbon.fromParty)}
              </span>
              <ArrowRight size={12} className="text-slate-500" />
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getPartyColor(hoveredRibbon.toParty) }}
              />
              <span className="font-semibold text-white">
                {getPartyLabel(hoveredRibbon.toParty)}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <span>{hoveredRibbon.votes.toLocaleString()} votes</span>
              <span className="text-amber-400 font-bold">{hoveredRibbon.pct}% of flow</span>
            </div>
          </div>
        )}

        {/* 0% or Dropped-off Parties Badge Buttons at the bottom of the Sankey container */}
        {zeroParties.length > 0 && (
          <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center gap-1.5 px-1 flex-wrap">
            {zeroParties.map(p => {
              const color = getPartyColor(p);
              const code = getPartyCode(p);
              return (
                <button
                  key={p}
                  id={`restore-party-badge-${p.toLowerCase()}`}
                  onClick={() => handlePutPartyBack(p)}
                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold tracking-tight border transition-all cursor-pointer shadow-sm hover:brightness-125 active:scale-95"
                  style={{
                    backgroundColor: `${color}20`,
                    borderColor: `${color}60`,
                    color: color,
                  }}
                  title={`Restore ${getPartyLabel(p)} with 1% primary`}
                >
                  + {code}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Outcome Summary Card */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: getPartyColor(simulation.winner) }}
          />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              Projected 2CP Winner
            </span>
            <span className="text-sm font-bold text-white">
              {getPartyLabel(simulation.winner)} by {simulation.winningMargin}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right text-[11px] font-mono">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px]">
              {getPartyLabel(simulation.winner)}
            </span>
            <span className="font-bold text-white">
              {simulation.finalPercentages[simulation.winner]}%
            </span>
          </div>
          <span className="text-slate-600">vs</span>
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px]">
              {getPartyLabel(simulation.runnerUp)}
            </span>
            <span className="font-bold text-slate-300">
              {simulation.finalPercentages[simulation.runnerUp]}%
            </span>
          </div>
        </div>
      </div>

      {/* Instruction Tips */}
      <div className="flex items-start gap-2 p-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] leading-relaxed">
        <Info size={14} className="shrink-0 mt-0.5 text-blue-400" />
        <span>
          <strong>Interactive Controls:</strong> Drag the primary percentage badges on the 1st round to shift primary votes, or drag the percentage badges on the transfer ribbons to model changes in preference distributions. Any parties at 0% or dropped off can be reintroduced with 1% primary (distributed evenly from other parties) using the restoration buttons.
        </span>
      </div>
    </div>
  );
};
