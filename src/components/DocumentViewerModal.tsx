'use client';

import React from 'react';
import { UploadedFileRecord, FileVerificationStatus } from '@/lib/admin-store';

interface DocumentViewerModalProps {
  file: UploadedFileRecord | null;
  onClose: () => void;
  isAdmin?: boolean;
  onUpdateStatus?: (fileId: string, status: FileVerificationStatus, notes?: string) => void;
}

export function DocumentViewerModal({
  file,
  onClose,
  isAdmin = false,
  onUpdateStatus,
}: DocumentViewerModalProps) {
  if (!file) return null;

  const isImage = file.mimeType.startsWith('image/') || file.dataUrl.startsWith('data:image/');
  const isPdf = file.mimeType.includes('pdf') || file.dataUrl.startsWith('data:application/pdf');

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-ink/20 overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 bg-white">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-forest-50 text-forest-800 font-semibold border border-forest-200">
                {file.categoryLabel}
              </span>
              <span
                className={`text-[11px] uppercase px-2 py-0.5 rounded font-semibold ${
                  file.verificationStatus === 'verified'
                    ? 'bg-forest-100 text-forest-800'
                    : file.verificationStatus === 'rejected'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-paper-200 text-ink-600'
                }`}
              >
                {file.verificationStatus === 'verified' ? 'Verified' : 'Pending Audit'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-ink truncate mt-1">{file.name}</h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {file.dataUrl && (
              <a
                href={file.dataUrl}
                download={file.name}
                className="px-3.5 py-1.5 rounded-lg border border-ink/15 text-xs font-semibold text-ink hover:bg-paper-100 transition-colors"
              >
                Download File ↓
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-paper border border-ink/10 text-ink hover:bg-paper-200 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Content View */}
        <div className="flex-1 overflow-auto p-6 bg-paper-100 flex items-center justify-center min-h-[350px]">
          {isImage ? (
            <div className="relative max-w-full max-h-[60vh] rounded-xl overflow-hidden shadow border border-ink/10 bg-white">
              <img
                src={file.dataUrl}
                alt={file.name}
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
            </div>
          ) : isPdf ? (
            <div className="w-full h-[60vh] bg-white rounded-xl border border-ink/10 overflow-hidden flex flex-col">
              <iframe
                src={file.dataUrl}
                title={file.name}
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-2xl border border-ink/10 max-w-md shadow-sm">
              <span className="text-4xl block mb-2">📑</span>
              <p className="font-serif text-base text-ink font-semibold">{file.name}</p>
              <p className="text-xs text-ink-600 font-mono mt-1">
                {(file.sizeBytes / 1024).toFixed(1)} KB · {file.mimeType}
              </p>
              <p className="text-xs text-ink-600 mt-3">
                Direct in-browser preview not supported for this file type.
              </p>
              {file.dataUrl && (
                <a
                  href={file.dataUrl}
                  download={file.name}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-white text-xs font-semibold hover:bg-ink-800 transition-colors"
                >
                  Download and Open Locally ↓
                </a>
              )}
            </div>
          )}
        </div>

        {/* Admin Verification Action Bar */}
        {isAdmin && onUpdateStatus && (
          <div className="px-6 py-4 bg-white border-t border-ink/10 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-ink-600 font-mono">
              Audit Action for this document:
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(file.id, 'verified');
                  onClose();
                }}
                className="px-4 py-2 rounded-full bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 transition-colors cursor-pointer"
              >
                ✓ Mark Document Verified
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(file.id, 'needs_clarification', 'Please upload a clearer copy with visible seal.');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-full border border-amber-300 bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
              >
                ⚠️ Request Clearer Copy
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(file.id, 'rejected', 'Document does not match stated title.');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-full border border-ink/15 text-amber-900 text-xs font-semibold hover:bg-paper-100 transition-colors cursor-pointer"
              >
                ✕ Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
