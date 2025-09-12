// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.padding = '0.5rem 0';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
                header.style.padding = '1rem 0';
            }
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .founder-card, .library-item, .book-card, .resource-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .founder-card, .library-item, .book-card, .resource-card');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
    
    // Typing text effect
    const typingTextElements = document.querySelectorAll('.typing-text');
    typingTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // Video library modal functionality
    const videoItems = document.querySelectorAll('.video-item');
    if (videoItems.length > 0) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modal.style.zIndex = '1000';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.flexDirection = 'column';
        
        const videoPlayer = document.createElement('video');
        videoPlayer.controls = true;
        videoPlayer.style.maxWidth = '80%';
        videoPlayer.style.maxHeight = '80%';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.background = 'var(--primary-blue)';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.cursor = 'pointer';
        
        modal.appendChild(videoPlayer);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Add click event to video items
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                const videoSource = this.getAttribute('data-video');
                videoPlayer.src = videoSource;
                modal.style.display = 'flex';
                videoPlayer.play();
            });
        });
        
        // Close modal functionality
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        });
    }
    
    // Book download functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookUrl = this.getAttribute('data-url');
            const fileName = this.getAttribute('data-filename');
            
            // Create a temporary anchor element for download
            const a = document.createElement('a');
            a.href = bookUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Show download confirmation
            this.textContent = 'Downloaded!';
            this.style.background = 'green';
            
            setTimeout(() => {
                this.textContent = 'Download';
                this.style.background = '';
            }, 2000);
        });
    });
});






























// Stats counter animation
const startCounter = function() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => startCounter(), 1);
        }
    });
};

// Start counter when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}





































// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Social link click handlers (example)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('span').textContent;
        alert(`Redirecting to our ${platform} page! In a real implementation, this would open the actual social media profile.`);
    });
});












// Library Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const libraryItems = document.querySelectorAll('.library-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            libraryItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Video Modal Functionality
const videoItems = document.querySelectorAll('.library-item[data-category*="video"]');
const videoModal = document.querySelector('.video-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.querySelector('.modal-title');
const modalVideo = document.querySelector('.modal-body video');

if (videoItems.length > 0) {
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            // In a real implementation, you would set the actual video source
            // modalVideo.src = 'path/to/video.mp4';
            
            modalTitle.textContent = title;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

// Close modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Load More functionality (simulated)
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more content
        loadMoreBtn.textContent = 'Loading...';
        setTimeout(() => {
            alert('In a real implementation, this would load more library items from a server.');
            loadMoreBtn.textContent = 'Load More Content';
        }, 1000);
    });
}