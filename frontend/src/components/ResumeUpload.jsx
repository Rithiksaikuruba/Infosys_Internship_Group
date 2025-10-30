import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../context/ThemeContext';

const ResumeUpload = ({ onFileSelect, selectedFile }) => {
  const { isDark } = useTheme();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMode, setUploadMode] = useState('file');
  const [sessionId] = useState(uuidv4());
  const canvasRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 8;
          });
        }, 125);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  useEffect(() => {
    if (uploadMode === 'qr' && canvasRef.current) {
      const url = `${window.location.origin}/mobile-upload/${sessionId}`;
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: isDark ? '#FFFFFF' : '#000000',
          light: isDark ? '#374151' : '#FFFFFF',
        },
      });
    }
  }, [uploadMode, sessionId, isDark]);

  return (
    <div
      className={`${
        isDark ? 'bg-gray-900 shadow-[0_10px_40px_rgba(33,107,243,0.5)]' : 'bg-white shadow-xl'
      } rounded-2xl p-8 transition-all duration-700 group relative
         ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
      style={{
        boxShadow: isDark
          ? '0 12px 40px -10px rgba(33, 107, 243, 0.4)'
          : '0 10px 40px -8px rgba(33, 107, 243, 0.22), 0 1.5px 18px rgba(30,42,73,0.1)',
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_6px_48px_6px_rgba(33,107,243,0.22)]
                     transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                     motion-reduce:transition-none"
        style={{ willChange: 'box-shadow' }}
      ></div>
      <h3
        className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors
                   ease-[cubic-bezier(0.22,1,0.36,1)]`}
      >
        Upload Resume
      </h3>

      <div className="flex items-center justify-center mb-6 select-none">
        <span
          className={`mr-3 text-sm font-medium ${
            uploadMode === 'file' ? 'text-blue-600' : isDark ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          File Upload
        </span>
        <label
          className="relative inline-flex items-center cursor-pointer transition ease-out duration-300 hover:scale-[1.05]
                     active:scale-[0.97] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          aria-label="Toggle upload mode"
        >
          <input
            type="checkbox"
            className="sr-only peer"
            checked={uploadMode === 'qr'}
            onChange={() => setUploadMode(uploadMode === 'file' ? 'qr' : 'file')}
          />
          <div
            className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border
                        after:rounded-full after:h-5 after:w-5 after:shadow-md after:transition-all peer-checked:bg-blue-600
                        ${isDark ? 'bg-gray-700 after:border-gray-400' : 'bg-gray-300 after:border-gray-300'}
                        peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-400
                        peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent
                        ease-[cubic-bezier(0.22,1,0.36,1)]`}
            style={{ willChange: 'transform, background-color' }}
            aria-checked={uploadMode === 'qr'}
            role="switch"
          ></div>
        </label>
        <span
          className={`ml-3 text-sm font-medium ${
            uploadMode === 'qr' ? 'text-blue-600' : isDark ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          QR Code
        </span>
      </div>

      {uploadMode === 'file' ? (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                     transition-colors duration-350 group
                     ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400
                     focus-visible:ring-offset-2
                     ${
                       isDragActive && !isDragReject
                         ? 'border-blue-600 bg-blue-100 dark:bg-blue-900/25 animate-[pulse_0.8s]'
                         : ''
                     }
                     ${
                       isDragReject
                         ? 'border-red-600 bg-red-100 dark:bg-red-900/25 animate-[shake_0.32s]'
                         : isDark
                         ? 'border-gray-700 hover:border-blue-600'
                         : 'border-gray-300 hover:border-blue-500'
                     }
                     ${selectedFile ? 'border-green-600 bg-green-100 dark:bg-green-900/25' : ''} group-hover:shadow-xl`}
          style={{
            transition: 'border-color 0.3s, box-shadow 0.5s, background 0.45s',
            willChange: 'box-shadow, background-color, border-color',
            minHeight: "190px", // Ensure enough height for centering
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
          role="button"
          aria-label="Upload resume by dragging and dropping or clicking to select"
          aria-invalid={isDragReject ? 'true' : 'false'}
          tabIndex={0}
        >
          <input {...getInputProps()} aria-label="Resume file input" />
          <div className="space-y-4 flex flex-col justify-center items-center w-full h-full">
            {!selectedFile ? (
              <>
                <div
                  className={`mx-auto w-14 h-14 transition duration-400 group-hover:scale-110
                               ${isDark ? 'text-gray-400' : 'text-gray-500'}
                               ease-[cubic-bezier(0.22,1,0.36,1)]`}
                  style={{ willChange: 'transform' }}
                  aria-hidden="true"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}
                               transition-colors group-hover:text-blue-700`}
                  >
                    {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    or click to select a file
                  </p>
                  <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Supports PDF, DOC, DOCX (max 10MB)
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center space-y-3 animate-slideInUp transition-all duration-500">
                {/* Icon flex centered */}
                <div className="flex items-center justify-center w-14 h-14">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true" className="w-10 h-10 text-green-700 drop-shadow-md">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFile.name}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadProgress < 100 && (
                    <div className="mt-3 transition-all duration-700" role="status" aria-live="polite">
                      <div className={`rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} shadow-inner`}>
                        <div
                          className="bg-blue-700 h-2 rounded-full transition-all duration-700 progress-shimmer shadow-md"
                          style={{ width: `${uploadProgress}%`, willChange: 'width' }}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={uploadProgress}
                          role="progressbar"
                          aria-label="Upload progress"
                        />
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <p className="text-sm text-green-700 mt-2 animate-fadeIn shadow-sm" role="status" aria-live="polite">
                      ✓ Ready for analysis
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileSelect(null);
                    setUploadProgress(0);
                  }}
                  className="text-sm text-red-700 hover:text-red-800 underline animate-fadeIn transition-all duration-500
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                  style={{ textDecorationThickness: '2px', willChange: 'color' }}
                  type="button"
                  aria-label="Remove file"
                >
                  Remove file
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center animate-fadeIn ${
            isDark ? 'border-gray-700 bg-gray-800/40 shadow-lg' : 'border-gray-300 bg-white shadow-md'
          } group-hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
          role="region"
          aria-label="QR code upload section"
          style={{ willChange: 'box-shadow' }}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div
                className="p-5 rounded-xl bg-white shadow-lg ring-1 ring-black/10
                          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                          motion-reduce:transition-none select-none"
                style={{ willChange: 'transform, box-shadow', transform: 'translateZ(0)' }}
              >
                <canvas ref={canvasRef} />
              </div>
            </div>
            <div>
              <p className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                Scan to Upload Resume
              </p>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Scan this QR code with any device to upload your resume
              </p>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Session ID: {sessionId.slice(0, 8)}...
              </p>
            </div>
          </div>
        </div>
      )}

      {isDragReject && uploadMode === 'file' && (
        <p className="mt-2 text-sm text-red-700 animate-shake shadow-sm" role="alert" aria-live="assertive">
          Please upload a valid resume file (PDF, DOC, DOCX)
        </p>
      )}

      <style>
        {`
          .surface-gradient {
            background-image: radial-gradient(1200px 400px at 50% -10%, rgba(33,107,243,0.08), transparent);
          }
          .ease-spring { animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          .progress-shimmer {
            background-image: linear-gradient(
              90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.4) 50%,
              rgba(255,255,255,0) 100%
            );
            background-size: 220% 100%;
            animation: shimmer 1.4s ease-in-out infinite;
          }
          @keyframes shimmer {
            from { background-position: 220% 0; }
            to   { background-position: -220% 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards; }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-slideInUp { animation: slideInUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
          @keyframes shake {
            0% { transform: translateX(0); }
            15% { transform: translateX(-4px); }
            35% { transform: translateX(7px); }
            55% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
            100% { transform: translateX(0); }
          }
          .animate-shake { animation: shake 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(33,107,243,0.25); }
            70% { box-shadow: 0 0 0 14px rgba(33,107,243,0); }
            100% { box-shadow: 0 0 0 0 rgba(33,107,243,0.25); }
          }
          .animate-pulse { animation: pulse 0.6s ease forwards; }
          @media (prefers-reduced-motion: reduce) {
            .animate-fadeIn,
            .animate-slideInUp,
            .animate-shake,
            .animate-pulse,
            .progress-shimmer {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumeUpload;
