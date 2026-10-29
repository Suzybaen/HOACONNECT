'use client';
import React, { useState } from 'react';
import { Megaphone, Send, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Badge from '@/components/ui/Badge';
import { useCommunity, type AnnouncementCategory } from '@/contexts/CommunityContext';

type AnnForm = { title: string; body: string; category: AnnouncementCategory };

export default function AnnouncementComposer() {
  const { announcements, postAnnouncement } = useCommunity();
  const [posting, setPosting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AnnForm>({
    defaultValues: { title: '', body: '', category: 'general' },
  });

  const onPost = async (data: AnnForm) => {
    setPosting(true);
    await new Promise((r) => setTimeout(r, 700));
    postAnnouncement(data);
    setPosting(false);
    reset();
    toast.success('Announcement posted and sent to all household accounts.', { duration: 4000 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Megaphone size={16} className="text-primary-700" />
          <h3 className="text-sm font-semibold text-foreground">Post Announcement</h3>
        </div>
      </div>

      <div className="p-5">
        <form onSubmit={handleSubmit(onPost)} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5" htmlFor="ann-category">Category</label>
            <select
              id="ann-category"
              {...register('category', { required: true })}
              className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors"
            >
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
              <option value="billing">Billing</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5" htmlFor="ann-title">Title</label>
            <input
              id="ann-title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Announcement headline..."
              className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5" htmlFor="ann-body">Message</label>
            <textarea
              id="ann-body"
              {...register('body', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
              rows={3}
              placeholder="Write your announcement..."
              className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary-700 transition-colors resize-none"
            />
            {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body.message}</p>}
          </div>
          <button
            type="submit"
            disabled={posting}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 active:scale-95 transition-all duration-150 disabled:opacity-60"
          >
            <Send size={15} />
            {posting ? 'Posting...' : 'Post & Notify All Homeowners'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Recent Posts Visible to Households</p>
          <div className="space-y-2">
            {announcements.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/40 transition-colors group">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge variant={a.category} size="sm">{a.category}</Badge>
                  <p className="text-xs text-foreground font-medium truncate">{a.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                  <button
                    onClick={() => toast.info('Demo delete only. Connect backend delete API next.', { duration: 2000 })}
                    className="p-1 rounded text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete announcement"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
