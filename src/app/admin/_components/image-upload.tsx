'use client';

import { ImageUp, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { adminApi } from '@/lib/api/services';

type ImageUploadProps = {
  name?: string;
  label?: string;
  defaultValue?: string;
};

export function ImageUpload({
  name = 'image',
  label = 'Изображение',
  defaultValue = '',
}: ImageUploadProps) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <label className="admin-image-upload">
      <span>{label}</span>
      <input name={name} type="hidden" value={value} />
      <div className="admin-image-upload-box">
        {value ? (
          <span className="admin-image-preview">
            <Image alt="" fill sizes="420px" src={value} unoptimized />
          </span>
        ) : (
          <span className="admin-image-placeholder">
            <ImageUp />
            <b>Загрузить изображение</b>
            <small>JPG, PNG, WEBP или GIF до 8 МБ</small>
          </span>
        )}

        <input
          accept="image/*"
          disabled={loading}
          type="file"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            setError('');
            setLoading(true);
            try {
              const asset = await adminApi.uploadImage(file);
              setValue(asset.url);
            } catch {
              setError('Не удалось загрузить изображение');
            } finally {
              setLoading(false);
              event.target.value = '';
            }
          }}
        />

        {loading && (
          <span className="admin-image-upload-loading">
            <Loader2 />
          </span>
        )}

        {value && (
          <button
            aria-label="Удалить изображение"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setValue('');
            }}
          >
            <X />
          </button>
        )}
      </div>
      {error && <small>{error}</small>}
    </label>
  );
}
