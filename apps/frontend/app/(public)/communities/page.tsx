'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/StudentSidebar';
import ThemeToggle from '@/components/ThemeToggle';

interface Post {
  id: string;
  author: string;
  avatarBg: string;
  avatarText: string;
  authorTag: string; // e.g. 'Student', 'Mentor · TU Berlin'
  isMentor?: boolean;
  time: string;
  title: string;
  preview: string;
  tags: string[];
  helpfulCount: number;
  repliesCount: number;
  hasUserLiked?: boolean;
}

export default function CommunitiesPage() {
  const [activeChannel, setActiveChannel] = useState<'pak-ger' | 'pak-uk' | 'visas'>('pak-ger');
  const [filterTab, setFilterTab] = useState<'all' | 'questions' | 'tips' | 'discussions'>('all');

  // New Post Popup Modal (Screen 2)
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [postType, setPostType] = useState<'question' | 'looking-room' | 'tips'>('question');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Channels
  const channels = [
    { id: 'pak-ger', name: 'Pakistan ➔ Germany', members: '1,420 members', icon: '🇩🇪', active: true },
    { id: 'pak-uk', name: 'Pakistan ➔ United Kingdom', members: '890 members', icon: '🇬🇧', active: false },
    { id: 'visas', name: 'Visa waitlists & timelines', members: '2,150 members', icon: '🛂', active: false },
  ];

  // Community posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p1',
      author: 'Hamza S.',
      avatarBg: 'bg-blue-100 dark:bg-blue-950',
      avatarText: 'text-blue-800 dark:text-blue-300',
      authorTag: 'Student',
      time: '2 hours ago',
      title: 'Is a 2.8 CGPA enough to apply for TU Berlin Informatik?',
      preview:
        'My BS was in CS from FAST (76%, 2.8 CGPA). Public profile check on DAAD database looks promising, but curious if anyone from Pakistan with a similar profile got admitted or if the module description filter got you.',
      tags: ['Admissions', 'TU Berlin', 'CGPA'],
      helpfulCount: 14,
      repliesCount: 6,
      hasUserLiked: false,
    },
    {
      id: 'p2',
      author: 'Ayesha M.',
      avatarBg: 'bg-emerald-100 dark:bg-emerald-950',
      avatarText: 'text-emerald-800 dark:text-emerald-300',
      authorTag: 'Mentor · TU Berlin MSc CS',
      isMentor: true,
      time: '5 hours ago',
      title: 'Tips on opening your blocked account early',
      preview:
        'Please provide 2-3 extra weeks of cushion for transfers. Opening is easy, but some Pakistani banks require the official embassy letter to verify your file before wire transfer.',
      tags: ['Blocked account', 'Fintiba', 'Expatrio'],
      helpfulCount: 38,
      repliesCount: 11,
      hasUserLiked: true,
    },
    {
      id: 'p3',
      author: 'Bilal R.',
      avatarBg: 'bg-purple-100 dark:bg-purple-950',
      avatarText: 'text-purple-800 dark:text-purple-300',
      authorTag: 'Student',
      time: '1 day ago',
      title: 'Anyone else waiting on uni-assist for Saarland?',
      preview:
        'Submitted in the 2nd week of October. How long did your evaluation take? Mine still says in processing.',
      tags: ['uni-assist', 'Saarland'],
      helpfulCount: 9,
      repliesCount: 4,
      hasUserLiked: false,
    },
  ]);

  const toggleHelpful = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = p.hasUserLiked;
          return {
            ...p,
            helpfulCount: liked ? p.helpfulCount - 1 : p.helpfulCount + 1,
            hasUserLiked: !liked,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Sara K.',
      avatarBg: 'bg-emerald-100 dark:bg-emerald-950',
      avatarText: 'text-emerald-800 dark:text-emerald-300',
      authorTag: 'Student',
      time: 'Just now',
      title: postTitle.trim(),
      preview: postContent.trim() || 'No additional details provided.',
      tags: [postType === 'question' ? 'Question' : postType === 'looking-room' ? 'Housing' : 'Tips'],
      helpfulCount: 1,
      repliesCount: 0,
      hasUserLiked: true,
    };

    setPosts([newPost, ...posts]);
    setPostSuccess(true);
    setTimeout(() => {
      setShowNewPostModal(false);
      setPostTitle('');
      setPostContent('');
      setPostSuccess(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-white">Communities</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                SK
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl w-full mx-auto space-y-6 text-start">
          {/* Main 2-Column Layout: Left Channels & Right Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Channels List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Your communities:
                </span>
                <div className="space-y-1.5">
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveChannel(ch.id as any)}
                      className={`w-full p-3 rounded-2xl text-start transition flex items-center gap-3 ${
                        activeChannel === ch.id
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{ch.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate">{ch.name}</p>
                        <p className="text-[10px] text-slate-400">{ch.members}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guidelines Notice */}
              <div className="p-4 rounded-3xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
                <p className="font-bold text-slate-700 dark:text-slate-300">🛡️ Community guidelines:</p>
                <p>Real verified students and mentors only. No spam, consultancy promotions, or off-platform payment solicitations allowed.</p>
              </div>
            </div>

            {/* Right Column: Feed with Post Action & Filter Bar */}
            <div className="lg:col-span-8 space-y-4">
              {/* Channel Header Banner with + New Post Button */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇩🇪</span>
                    <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Pakistan ➔ Germany
                    </h1>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    1,420 members · Admissions, blocked accounts, visas, and life in Germany.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewPostModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition shrink-0 flex items-center gap-1.5"
                >
                  <span>+</span>
                  <span>New post</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setFilterTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterTab === 'all'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All discussions
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('questions')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterTab === 'questions'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Questions
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('tips')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterTab === 'tips'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Tips &amp; guides
                </button>
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
                  >
                    {/* Author & Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${post.avatarBg} ${post.avatarText}`}
                        >
                          {post.author.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {post.author}
                            </span>
                            {post.isMentor && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                                Verified mentor
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {post.authorTag} · {post.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {post.preview}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
                      <button
                        type="button"
                        onClick={() => toggleHelpful(post.id)}
                        className={`flex items-center gap-1.5 transition font-semibold ${
                          post.hasUserLiked
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>👍</span>
                        <span>{post.helpfulCount} helpful</span>
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition font-semibold"
                      >
                        <span>💬</span>
                        <span>{post.repliesCount} replies</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert('Post link copied to clipboard')}
                        className="hover:text-slate-900 dark:hover:text-white transition ml-auto"
                      >
                        🔗 Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SCREEN 2: NEW POST POP-UP MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl text-start space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  New post in Pakistan ➔ Germany
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Visible to 1,420 Pakistani applicants and mentors
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewPostModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            {postSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                ✓ Your post has been published to the community!
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Post Type Chips */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPostType('question')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      postType === 'question'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Question
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('looking-room')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      postType === 'looking-room'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Looking for a roommate
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('tips')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      postType === 'tips'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Tips / Experience
                  </button>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. How strictly does RWTH Aachen require 180 ECTS in CS?"
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Details
                  </label>
                  <textarea
                    rows={4}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Give context on your background, target semester, and university..."
                    className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                  />
                </div>

                <p className="text-[10px] text-slate-400">
                  🔒 Do not post phone numbers or sensitive passport data. Keep discussions inside platform.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
                  >
                    Post
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
