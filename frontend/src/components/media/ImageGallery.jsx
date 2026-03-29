import React, { useState } from 'react';

const ImageGallery = ({ images = [], alt = 'Vehicle' }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // Filter out null/empty images
    const validImages = images.filter(Boolean);

    if (validImages.length === 0) {
        return (
            <div style={{
                width: '100%', height: '350px', borderRadius: '12px',
                background: 'var(--card-bg)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', opacity: 0.5,
            }}>
                <p>No images available</p>
            </div>
        );
    }

    const goNext = () => setActiveIndex(i => (i + 1) % validImages.length);
    const goPrev = () => setActiveIndex(i => (i - 1 + validImages.length) % validImages.length);

    return (
        <div style={{ width: '100%' }}>

            {/* ── MAIN IMAGE ── */}
            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                <img
                    src={validImages[activeIndex]}
                    alt={`${alt} ${activeIndex + 1}`}
                    onClick={() => setLightboxOpen(true)}
                    style={{
                        width: '100%', height: '350px',
                        objectFit: 'cover', cursor: 'zoom-in',
                        display: 'block',
                    }}
                />

                {/* Prev / Next arrows — only show if multiple images */}
                {validImages.length > 1 && (
                    <>
                        <button onClick={goPrev} style={{
                            position: 'absolute', left: '10px', top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)', color: 'white',
                            border: 'none', borderRadius: '50%',
                            width: '36px', height: '36px', cursor: 'pointer',
                            fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>‹</button>
                        <button onClick={goNext} style={{
                            position: 'absolute', right: '10px', top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)', color: 'white',
                            border: 'none', borderRadius: '50%',
                            width: '36px', height: '36px', cursor: 'pointer',
                            fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>›</button>
                    </>
                )}

                {/* Image counter */}
                {validImages.length > 1 && (
                    <div style={{
                        position: 'absolute', bottom: '10px', right: '10px',
                        background: 'rgba(0,0,0,0.6)', color: 'white',
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem',
                    }}>
                        {activeIndex + 1} / {validImages.length}
                    </div>
                )}
            </div>

            {/* ── THUMBNAILS ── only show if multiple images */}
            {validImages.length > 1 && (
                <div style={{
                    display: 'flex', gap: '8px', marginTop: '10px',
                    overflowX: 'auto', paddingBottom: '4px',
                }}>
                    {validImages.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`${alt} thumbnail ${i + 1}`}
                            onClick={() => setActiveIndex(i)}
                            style={{
                                width: '70px', height: '50px',
                                objectFit: 'cover', borderRadius: '6px',
                                cursor: 'pointer', flexShrink: 0,
                                border: activeIndex === i
                                    ? '2px solid var(--accent-color)'
                                    : '2px solid transparent',
                                opacity: activeIndex === i ? 1 : 0.6,
                                transition: 'opacity 0.2s, border 0.2s',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── LIGHTBOX ── fullscreen overlay on click */}
            {lightboxOpen && (
                <div
                    onClick={() => setLightboxOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-out',
                    }}
                >
                    <img
                        src={validImages[activeIndex]}
                        alt={alt}
                        style={{
                            maxWidth: '90vw', maxHeight: '90vh',
                            objectFit: 'contain', borderRadius: '8px',
                        }}
                    />

                    {/* Close button */}
                    <button
                        onClick={() => setLightboxOpen(false)}
                        style={{
                            position: 'absolute', top: '20px', right: '20px',
                            background: 'rgba(255,255,255,0.2)', color: 'white',
                            border: 'none', borderRadius: '50%',
                            width: '40px', height: '40px', fontSize: '1.2rem',
                            cursor: 'pointer',
                        }}
                    >✕</button>

                    {/* Lightbox prev/next */}
                    {validImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                style={{
                                    position: 'absolute', left: '20px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)', color: 'white',
                                    border: 'none', borderRadius: '50%',
                                    width: '44px', height: '44px', fontSize: '1.4rem',
                                    cursor: 'pointer',
                                }}
                            >‹</button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                style={{
                                    position: 'absolute', right: '20px', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)', color: 'white',
                                    border: 'none', borderRadius: '50%',
                                    width: '44px', height: '44px', fontSize: '1.4rem',
                                    cursor: 'pointer',
                                }}
                            >›</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;