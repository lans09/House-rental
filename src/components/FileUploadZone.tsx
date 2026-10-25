'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadedFileRecord, DocumentCategory } from '@/lib/admin-store';

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  c_of_o: 'Certificate of Occupancy (C of O)',
  deed_of_assignment: 'Registered Deed of Assignment / Conveyance',
  mandate_letter: 'Direct Landlord Authorization / Mandate Letter',
  building_plan: 'Approved Building Plan',
  survey_plan: 'Survey Plan',
  utility_bill: 'Recent Compound / Utility Bill (Address Proof)',
  other: 'Other Supporting Property Papers',
};

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export function PhotoUploader({ photos, onChange, maxPhotos = 8 }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxPhotos - photos.length;
    if (remainingSlots <= 0) return;

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    selectedFiles.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onChange([...photos, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (idx: number) => {
    onChange(photos.filter((_, i) => i !== idx));
  };

  const makePrimary = (idx: number) => {
    if (idx === 0) return;
    const target = photos[idx];
    const rest = photos.filter((_, i) => i !== idx);
    onChange([target, ...rest]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold text-ink-800">
            Property photographs
          </label>
          <p className="text-xs text-ink-600 mt-0.5">
            Upload clear exterior, interior, compound &amp; street photos. First image is the main catalogue cover.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-paper-100 text-ink-800 border border-ink/10">
          {photos.length} / {maxPhotos} uploaded
        </span>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-forest-600 bg-forest-50/50'
            : 'border-ink/20 hover:border-ink/40 bg-white shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-full bg-paper-100 border border-ink/15 flex items-center justify-center text-ink shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-forest-800" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-ink">
            Click to upload or drag and drop photos here
          </p>
          <p className="text-xs text-ink-600">
            JPG, PNG, WEBP · Up to 10MB per photo
          </p>
        </div>
      </div>

      {/* Thumbnails Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {photos.map((url, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden border transition-all group ${
                idx === 0
                  ? 'border-forest-600 ring-2 ring-forest-500/30'
                  : 'border-ink/10 hover:border-ink/30'
              }`}
            >
              <div className="relative h-24 w-full bg-paper-200">
                <Image
                  src={url}
                  alt={`Property photo ${idx + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-forest-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                  Main Cover
                </span>
              )}

              <div className="p-2 bg-white flex items-center justify-between text-xs">
                {idx !== 0 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      makePrimary(idx);
                    }}
                    className="text-[11px] font-medium text-ink-600 hover:text-ink cursor-pointer"
                  >
                    Set as cover
                  </button>
                ) : (
                  <span className="text-[11px] text-forest-800 font-semibold">Primary Cover</span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(idx);
                  }}
                  className="text-ink-600 hover:text-amber-800 font-bold px-1.5 py-0.5 rounded hover:bg-paper-100 cursor-pointer"
                  title="Remove photo"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface DocumentUploaderProps {
  files: UploadedFileRecord[];
  onChange: (files: UploadedFileRecord[]) => void;
  onPreviewFile?: (file: UploadedFileRecord) => void;
}

export function DocumentUploader({ files, onChange, onPreviewFile }: DocumentUploaderProps) {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('deed_of_assignment');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = (e.target?.result as string) || '';
        const newRecord: UploadedFileRecord = {
          id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          sizeBytes: file.size,
          mimeType: file.type || 'application/pdf',
          dataUrl,
          uploadedAt: new Date().toISOString().slice(0, 10),
          category: selectedCategory,
          categoryLabel: CATEGORY_LABELS[selectedCategory],
          verificationStatus: 'unverified',
        };
        onChange([...files, newRecord]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDoc = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-sm font-semibold text-ink-800">
            Mandate &amp; Ownership Verification Papers
          </label>
          <p className="text-xs text-ink-600 mt-0.5">
            Attach official proof of ownership or authorization. Inspected privately by our verification desk before publishing.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-paper-100 text-ink-800 border border-ink/10 self-start sm:self-auto">
          {files.length} document{files.length === 1 ? '' : 's'} attached
        </span>
      </div>

      {/* Category selector + Dropzone */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-medium text-ink-600">
            Document type to attach:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory)}
            className="px-3.5 py-2 rounded-lg bg-white border border-ink/20 text-xs font-medium text-ink focus:outline-none focus:border-ink shadow-sm cursor-pointer"
          >
            {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => (
              <option key={catKey} value={catKey}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-forest-600 bg-forest-50/50'
              : 'border-ink/20 hover:border-ink/40 bg-white shadow-sm'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*,.doc,.docx"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex items-center justify-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-200/60 flex items-center justify-center text-forest-800 shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 12 15 15" />
              </svg>
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">
                Upload {CATEGORY_LABELS[selectedCategory]}
              </p>
              <p className="text-xs text-ink-600 mt-0.5">
                Click or drag file · PDF, Scanned Images, DOC up to 15MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attached Documents List */}
      {files.length > 0 && (
        <div className="space-y-2.5 pt-1">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-ink/15 hover:border-ink/30 transition-all text-xs shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-9 w-9 rounded-lg bg-paper-100 border border-ink/10 flex items-center justify-center text-forest-800 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink truncate max-w-[220px] sm:max-w-sm">
                      {file.name}
                    </p>
                    <span className="text-xs text-ink-600 tabular-nums">
                      ({formatFileSize(file.sizeBytes)})
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-medium text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-200/50">
                      {file.categoryLabel}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        file.verificationStatus === 'verified'
                          ? 'bg-forest-100 text-forest-800'
                          : file.verificationStatus === 'rejected'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-paper-100 text-ink-600 border border-ink/10'
                      }`}
                    >
                      {file.verificationStatus === 'verified' ? 'Verified' : 'Pending Audit'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                {onPreviewFile && (
                  <button
                    type="button"
                    onClick={() => onPreviewFile(file)}
                    className="px-3 py-1.5 rounded-lg border border-ink/15 hover:border-ink text-xs font-semibold text-ink hover:bg-paper-100 cursor-pointer transition-colors"
                  >
                    View
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeDoc(file.id)}
                  className="p-1.5 rounded-lg text-ink-600 hover:text-amber-800 hover:bg-paper-100 transition-colors cursor-pointer"
                  title="Remove document"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
