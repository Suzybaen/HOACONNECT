'use client';
import React from 'react';
import { Calendar, Trash2, CheckCircle2, MapPin } from 'lucide-react';
import { useCommunity } from '@/contexts/CommunityContext';

export default function UpcomingSchedule() {
  const { wasteSchedules } = useCommunity();

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden mb-20 lg:mb-0">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary-700" />
          <span className="text-sm font-semibold text-foreground">All Waste Collection Schedules</span>
        </div>
        <span className="text-xs text-muted-foreground">HOA-wide calendar</span>
      </div>
      <div className="divide-y divide-border">
        {wasteSchedules.map((schedule, index) => {
          const isUserSchedule = schedule.zone === 'B' || schedule.zone === 'All';
          return (
            <div
              key={schedule.id}
              className={`grid md:grid-cols-[44px_1fr_auto] gap-4 px-5 py-4 transition-colors hover:bg-muted/20 ${
                isUserSchedule ? 'bg-teal-50/50' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                index === 0 ? 'bg-primary-700 text-white' :
                schedule.zone === 'All' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'
              }`}>
                {index === 0 ? <Trash2 size={18} /> : schedule.zone === 'All' ? <CheckCircle2 size={18} /> : <Calendar size={18} />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{schedule.day}, {schedule.date}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isUserSchedule ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isUserSchedule ? 'Your Route' : `Zone ${schedule.zone}`}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{schedule.type}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin size={11} />
                  {schedule.blocks.join(', ')} - {schedule.notes}
                </p>
              </div>
              <div className="text-left md:text-right flex-shrink-0">
                <p className="text-xs font-semibold text-foreground">{schedule.time}</p>
                <p className="text-[11px] text-muted-foreground mt-1">Zone {schedule.zone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
