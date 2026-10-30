document.addEventListener('DOMContentLoaded', () => {

    if (window.lucide) {
        lucide.createIcons();
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
        });

        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    let currentVideoId = 'xNAjUr6fPsg';
    const videoThumbnailLayer = document.getElementById('video-thumbnail-layer');
    const iframeWrapper = document.getElementById('iframe-wrapper');

    function extractYouTubeId(url) {
        if (!url) return null;
        url = url.trim();
        const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/);
        if (match && match[2].length === 11) {
            return match[2];
        }
        return url.length === 11 ? url : null;
    }

    function playVideo(videoId) {
        const targetId = videoId || currentVideoId;
        if (iframeWrapper) {
            iframeWrapper.innerHTML = `
                <iframe
                    class="w-full h-full border-0"
                    src="https://www.youtube.com/embed/${targetId}?autoplay=1&rel=0"
                    title="Video Chiêu Sinh Dự Án Five Stars SSA101"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            `;
            iframeWrapper.classList.remove('hidden');
            if (videoThumbnailLayer) {
                videoThumbnailLayer.classList.add('hidden');
            }
        }
    }

    if (videoThumbnailLayer) {
        videoThumbnailLayer.addEventListener('click', () => {
            playVideo();
        });
    }

    window.setYouTubeVideo = function(videoIdOrUrl) {
        const videoId = extractYouTubeId(videoIdOrUrl);
        if (!videoId) {
            alert('Vui lòng nhập đường link YouTube hoặc Video ID 11 ký tự hợp lệ!');
            return false;
        }
        currentVideoId = videoId;
        const thumbImg = document.getElementById('video-thumb-img');
        if (thumbImg) {
            thumbImg.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
        playVideo(currentVideoId);
        return true;
    };

    const OFFICIAL_GOOGLE_FORM_URL = "https://forms.gle/rmNN4VMm8QDY4aqs6";

    window.setGoogleFormLink = function(url) {
        const targetUrl = url || OFFICIAL_GOOGLE_FORM_URL;
        document.querySelectorAll('a[href*="forms.gle"]').forEach(link => {
            link.href = targetUrl;
        });
    };

    const starCanvas = document.getElementById('starfield-canvas');
    if (starCanvas) {
        const ctx = starCanvas.getContext('2d');
        let width = starCanvas.width = window.innerWidth;
        let height = starCanvas.height = window.innerHeight;
        let backgroundStars = [];
        let shootingStars = [];
        let sparks = [];
        let animationFrameId = null;
        let nextSpawnTime = Date.now() + 800;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function initStarfield() {
            backgroundStars = [];
            const starCount = Math.min(220, Math.floor((width * height) / 7500));
            for (let i = 0; i < starCount; i++) {
                const radius = Math.random() * 1.35 + 0.35;
                const depth = (radius / 1.7) * 0.18 + 0.08;
                backgroundStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: radius,
                    vx: (Math.random() * 0.3 - 0.15) * depth,
                    vy: -(Math.random() * 0.38 + 0.18) * depth,
                    alpha: Math.random() * 0.7 + 0.25,
                    alphaSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
                    isGolden: Math.random() < 0.25,
                    isCross: Math.random() < 0.08,
                    rotation: Math.random() * Math.PI,
                    rotationSpeed: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1)
                });
            }
        }
        initStarfield();

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                width = starCanvas.width = window.innerWidth;
                height = starCanvas.height = window.innerHeight;
                initStarfield();
            }, 120);
        });

        function spawnShootingStar() {
            if (prefersReducedMotion) return;
            const startX = Math.random() * (width * 1.1) - (width * 0.1);
            const startY = Math.random() * (height * 0.4) - 50;
            const angle = (Math.PI / 4) + (Math.random() * 0.15 - 0.075);
            const speed = Math.random() * 10 + 16;
            shootingStars.push({
                x: startX,
                y: startY,
                angle: angle,
                speed: speed,
                length: Math.random() * 100 + 90,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                progress: 0,
                maxDistance: Math.random() * 450 + 350,
                alpha: 1,
                size: Math.random() * 1.4 + 1.6
            });
        }

        function checkSpawnTimer() {
            if (prefersReducedMotion) return;
            const now = Date.now();
            if (now >= nextSpawnTime) {
                spawnShootingStar();
                if (Math.random() < 0.35) {
                    setTimeout(spawnShootingStar, 320);
                }
                nextSpawnTime = now + Math.random() * 2200 + 2000;
            }
        }

        function renderScene() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < backgroundStars.length; i++) {
                const star = backgroundStars[i];
                star.x += star.vx;
                star.y += star.vy;

                if (star.y < -15) {
                    star.y = height + 15;
                    star.x = Math.random() * width;
                } else if (star.y > height + 15) {
                    star.y = -15;
                    star.x = Math.random() * width;
                }
                if (star.x < -15) {
                    star.x = width + 15;
                } else if (star.x > width + 15) {
                    star.x = -15;
                }

                star.alpha += star.alphaSpeed;
                if (star.alpha >= 0.95 || star.alpha <= 0.18) {
                    star.alphaSpeed = -star.alphaSpeed;
                }

                const color = star.isGolden
                    ? `rgba(251, 191, 36, ${star.alpha})`
                    : `rgba(255, 255, 255, ${star.alpha})`;

                if (star.isCross) {
                    star.rotation += star.rotationSpeed;
                    const cos = Math.cos(star.rotation);
                    const sin = Math.sin(star.rotation);
                    const arm = star.radius * 3.2;

                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(star.x - cos * arm, star.y - sin * arm);
                    ctx.lineTo(star.x + cos * arm, star.y + sin * arm);
                    ctx.moveTo(star.x + sin * arm, star.y - cos * arm);
                    ctx.lineTo(star.x - sin * arm, star.y + cos * arm);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }

            checkSpawnTimer();

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const meteor = shootingStars[i];
                meteor.x += meteor.dx;
                meteor.y += meteor.dy;
                meteor.progress += meteor.speed;

                const fadeProgress = meteor.progress / meteor.maxDistance;
                meteor.alpha = Math.max(0, 1 - Math.pow(fadeProgress, 1.4));

                const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
                const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

                if (Math.random() < 0.45 && sparks.length < 50) {
                    sparks.push({
                        x: meteor.x - Math.cos(meteor.angle) * (Math.random() * 30),
                        y: meteor.y - Math.sin(meteor.angle) * (Math.random() * 30),
                        alpha: meteor.alpha * 0.8,
                        size: Math.random() * 1.2 + 0.6,
                        decay: Math.random() * 0.04 + 0.02
                    });
                }

                const trailGradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
                trailGradient.addColorStop(0, 'rgba(242, 111, 33, 0)');
                trailGradient.addColorStop(0.35, `rgba(245, 158, 11, ${meteor.alpha * 0.45})`);
                trailGradient.addColorStop(0.75, `rgba(251, 191, 36, ${meteor.alpha * 0.9})`);
                trailGradient.addColorStop(1, `rgba(255, 253, 230, ${meteor.alpha})`);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(meteor.x, meteor.y);
                ctx.strokeStyle = trailGradient;
                ctx.lineWidth = meteor.size;
                ctx.lineCap = 'round';
                ctx.shadowColor = '#F59E0B';
                ctx.shadowBlur = 12;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(meteor.x, meteor.y, meteor.size * 1.15, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 240, ${meteor.alpha})`;
                ctx.shadowColor = '#FBBF24';
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.restore();

                if (meteor.progress >= meteor.maxDistance || meteor.x > width + 150 || meteor.y > height + 150) {
                    shootingStars.splice(i, 1);
                }
            }

            for (let i = sparks.length - 1; i >= 0; i--) {
                const sp = sparks[i];
                sp.alpha -= sp.decay;
                if (sp.alpha <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 191, 36, ${sp.alpha})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(renderScene);
        }

        function startAnimation() {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(renderScene);
            }
        }

        function stopAnimation() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAnimation();
            } else {
                startAnimation();
            }
        });

        startAnimation();
    }
});
