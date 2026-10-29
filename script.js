// Five Stars - SSA101 Course Website Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo biểu tượng Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. YouTube Video Embed / Lazy Load Player
    let currentVideoId = 'xNAjUr6fPsg';
    const videoThumbnailLayer = document.getElementById('video-thumbnail-layer');
    const togglePreviewBtn = document.getElementById('toggle-preview-btn');
    const youtubeInputBox = document.getElementById('youtube-input-box');
    const applyVideoBtn = document.getElementById('apply-video-btn');
    const customYoutubeUrl = document.getElementById('custom-youtube-url');
    const iframeWrapper = document.getElementById('iframe-wrapper');

    function extractYouTubeId(url) {
        if (!url) return null;
        url = url.trim();
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else if (url.length === 11) {
            return url;
        }
        return null;
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
            if (videoThumbnailLayer) videoThumbnailLayer.classList.add('hidden');
            if (youtubeInputBox) youtubeInputBox.classList.add('hidden');
        }
    }

    // Nhấn trực tiếp vào thumbnail hoặc nút Play ở giữa để phát video ngay
    if (videoThumbnailLayer) {
        videoThumbnailLayer.addEventListener('click', (e) => {
            // Không kích hoạt nếu bấm vào nút đổi link
            if (e.target.closest('#toggle-preview-btn') || e.target.closest('#youtube-input-box')) {
                return;
            }
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
        const directYtLink = document.getElementById('direct-youtube-link');
        if (directYtLink) {
            directYtLink.href = `https://youtube.com/shorts/${videoId}`;
        }
        playVideo(currentVideoId);
        return true;
    };

    if (togglePreviewBtn && youtubeInputBox) {
        togglePreviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            youtubeInputBox.classList.toggle('hidden');
            if (!youtubeInputBox.classList.contains('hidden')) {
                customYoutubeUrl.focus();
            }
        });
    }

    if (applyVideoBtn && customYoutubeUrl) {
        applyVideoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = customYoutubeUrl.value;
            setYouTubeVideo(url);
        });

        customYoutubeUrl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.stopPropagation();
                applyVideoBtn.click();
            }
        });
    }

    // 4. Cấu hình Google Form Link
    const OFFICIAL_GOOGLE_FORM_URL = "https://forms.gle/rmNN4VMm8QDY4aqs6";

    window.setGoogleFormLink = function(url) {
        const formBtn = document.getElementById('google-form-link-btn');
        const targetUrl = url || OFFICIAL_GOOGLE_FORM_URL;
        if (formBtn && targetUrl) {
            formBtn.href = targetUrl;
        }
    };

    // Mặc định cảnh báo nhẹ nếu người dùng bấm khi chưa cấu hình link Google Form
    const googleFormBtn = document.getElementById('google-form-link-btn');
    if (googleFormBtn) {
        googleFormBtn.addEventListener('click', (e) => {
            if (googleFormBtn.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Giao diện đã sẵn sàng! Khi bạn có đường link Google Form chính thức, chỉ cần cung cấp link là nút này sẽ mở trực tiếp biểu mẫu của nhóm bạn.');
            }
        });
    }

    // 5. NỀN SAO ĐỘNG & HIỆU ỨNG SAO RƠI MÀU VÀNG (STARFIELD & GOLDEN METEORS)
    const starCanvas = document.getElementById('starfield-canvas');
    if (starCanvas) {
        const ctx = starCanvas.getContext('2d');
        let width = starCanvas.width = window.innerWidth;
        let height = starCanvas.height = window.innerHeight;

        // Resize mượt mà khi đổi kích thước màn hình
        window.addEventListener('resize', () => {
            width = starCanvas.width = window.innerWidth;
            height = starCanvas.height = window.innerHeight;
            initStarfield();
        });

        // 1. Khởi tạo mảng các ngôi sao lấp lánh nền (Có hiệu ứng trôi nhẹ nhàng)
        let backgroundStars = [];
        const STAR_COUNT = Math.min(220, Math.floor((width * height) / 7500));

        function initStarfield() {
            backgroundStars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                const radius = Math.random() * 1.35 + 0.35;
                const isGolden = Math.random() < 0.25; // 75% là sao trắng, 25% là sao vàng hổ phách
                
                // Hiệu ứng trôi nhẹ nhàng: sao lớn ở gần trôi nhanh hơn chút, sao nhỏ ở xa trôi chậm tạo chiều sâu parallax 3D
                const depth = (radius / 1.7) * 0.18 + 0.08;
                const vx = (Math.random() * 0.3 - 0.15) * depth;
                const vy = -(Math.random() * 0.38 + 0.18) * depth; // Trôi nhẹ nhàng hướng lên

                backgroundStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: radius,
                    vx: vx,
                    vy: vy,
                    alpha: Math.random() * 0.7 + 0.25,
                    alphaSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
                    isGolden: isGolden,
                    isCross: Math.random() < 0.08,   // ~8% là sao 4 cánh tỏa sáng như hình mẫu
                    rotation: Math.random() * Math.PI,
                    rotationSpeed: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1)
                });
            }
        }
        initStarfield();

        // 2. Quản lý các ngôi sao rơi (Golden Shooting Stars) và tàn sao (Sparks)
        let shootingStars = [];
        let sparks = [];

        function spawnShootingStar() {
            // Sao băng rơi chéo từ trên xuống dưới theo góc ~38-46 độ
            const startX = Math.random() * (width * 1.1) - (width * 0.1);
            const startY = Math.random() * (height * 0.4) - 50;
            const angle = (Math.PI / 4) + (Math.random() * 0.15 - 0.075);
            const speed = Math.random() * 10 + 16;
            const length = Math.random() * 100 + 90;
            const maxDistance = Math.random() * 450 + 350;

            shootingStars.push({
                x: startX,
                y: startY,
                angle: angle,
                speed: speed,
                length: length,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                progress: 0,
                maxDistance: maxDistance,
                alpha: 1,
                size: Math.random() * 1.4 + 1.6
            });
        }

        // Tự động rơi ngẫu nhiên sau mỗi 2.2s – 4.2s
        let nextSpawnTime = Date.now() + 800;
        function checkSpawnTimer() {
            const now = Date.now();
            if (now >= nextSpawnTime) {
                spawnShootingStar();
                // 35% tỉ lệ rơi sao đôi (cặp sao băng kế tiếp nhau)
                if (Math.random() < 0.35) {
                    setTimeout(() => spawnShootingStar(), 320);
                }
                nextSpawnTime = now + Math.random() * 2200 + 2000;
            }
        }

        // Tạm dừng khi chuyển tab để tối ưu hiệu năng và pin
        let isTabVisible = true;
        document.addEventListener('visibilitychange', () => {
            isTabVisible = !document.hidden;
        });

        // 3. Vòng lặp Animation 60FPS
        function renderScene() {
            if (isTabVisible) {
                ctx.clearRect(0, 0, width, height);

                // --- VẼ & CẬP NHẬT CÁC NGÔI SAO NỀN (TRÔI BỒNG BỀNH & LẤP LÁNH) ---
                for (let i = 0; i < backgroundStars.length; i++) {
                    const star = backgroundStars[i];
                    
                    // Di chuyển nhẹ nhàng (trôi bồng bềnh trong không gian)
                    star.x += star.vx;
                    star.y += star.vy;

                    // Vòng lặp mượt mà khi trôi ra khỏi màn hình
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

                    // Độ sáng lấp lánh (twinkle)
                    star.alpha += star.alphaSpeed;
                    if (star.alpha >= 0.95 || star.alpha <= 0.18) {
                        star.alphaSpeed = -star.alphaSpeed;
                    }

                    if (star.isCross) {
                        // Vẽ ngôi sao 4 cánh lấp lánh và xoay nhẹ (giống mẫu ảnh)
                        star.rotation += star.rotationSpeed;
                        ctx.save();
                        ctx.translate(star.x, star.y);
                        ctx.rotate(star.rotation);
                        ctx.strokeStyle = star.isGolden 
                            ? `rgba(251, 191, 36, ${star.alpha})` 
                            : `rgba(255, 255, 255, ${star.alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(-star.radius * 3.2, 0);
                        ctx.lineTo(star.radius * 3.2, 0);
                        ctx.moveTo(0, -star.radius * 3.2);
                        ctx.lineTo(0, star.radius * 3.2);
                        ctx.stroke();
                        ctx.restore();
                    } else {
                        // Sao chấm tròn trôi êm ái
                        ctx.beginPath();
                        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                        ctx.fillStyle = star.isGolden 
                            ? `rgba(251, 191, 36, ${star.alpha})` 
                            : `rgba(255, 255, 255, ${star.alpha})`;
                        ctx.fill();
                    }
                }

                // --- VẼ & CẬP NHẬT CÁC NGÔI SAO RƠI MÀU VÀNG (GOLDEN METEORS) ---
                checkSpawnTimer();

                for (let i = shootingStars.length - 1; i >= 0; i--) {
                    const meteor = shootingStars[i];
                    meteor.x += meteor.dx;
                    meteor.y += meteor.dy;
                    meteor.progress += meteor.speed;

                    // Mờ dần theo quãng đường bay
                    const fadeProgress = meteor.progress / meteor.maxDistance;
                    meteor.alpha = Math.max(0, 1 - Math.pow(fadeProgress, 1.4));

                    // Tọa độ đuôi vệt sáng
                    const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
                    const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

                    // Tạo tàn bụi sao vàng (stardust sparks)
                    if (Math.random() < 0.45 && sparks.length < 50) {
                        sparks.push({
                            x: meteor.x - Math.cos(meteor.angle) * (Math.random() * 30),
                            y: meteor.y - Math.sin(meteor.angle) * (Math.random() * 30),
                            alpha: meteor.alpha * 0.8,
                            size: Math.random() * 1.2 + 0.6,
                            decay: Math.random() * 0.04 + 0.02
                        });
                    }

                    // Vệt sáng vàng kim rực rỡ (Gradient từ đầu trắng vàng tới đuôi vàng cam mờ dần)
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

                    // Đầu phát sáng rực rỡ của sao rơi
                    ctx.beginPath();
                    ctx.arc(meteor.x, meteor.y, meteor.size * 1.15, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 240, ${meteor.alpha})`;
                    ctx.shadowColor = '#FBBF24';
                    ctx.shadowBlur = 16;
                    ctx.fill();
                    ctx.restore();

                    // Loại bỏ khi hoàn thành hành trình
                    if (meteor.progress >= meteor.maxDistance || meteor.x > width + 150 || meteor.y > height + 150) {
                        shootingStars.splice(i, 1);
                    }
                }

                // --- VẼ & CẬP NHẬT TÀN BỤI SAO VÀNG (SPARKS) ---
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
            }

            requestAnimationFrame(renderScene);
        }

        requestAnimationFrame(renderScene);
    }
});
