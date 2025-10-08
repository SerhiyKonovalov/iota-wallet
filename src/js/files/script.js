// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// Mobile Navigation + Scroll Header + Active Link
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.getElementById('nav-toggle');
	const navMenu = document.getElementById('nav-menu');
	const nav = document.querySelector('.nav');

	if (navToggle && navMenu && nav) {
		// Toggle mobile menu
		navToggle.addEventListener('click', function () {
			const isActive = navMenu.classList.toggle('nav__menu--active');
			navToggle.classList.toggle('nav__toggle--active');

			// додаємо/знімаємо фон на .nav
			if (isActive) {
				nav.classList.add('nav--menu-open');
			} else {
				nav.classList.remove('nav--menu-open');
			}
		});

		// Close menu when clicking on links
		const navLinks = navMenu.querySelectorAll('.nav__link');
		navLinks.forEach(link => {
			link.addEventListener('click', function () {
				navToggle.classList.remove('nav__toggle--active');
				navMenu.classList.remove('nav__menu--active');
				nav.classList.remove('nav--menu-open'); // прибираємо фон
			});
		});

		// Close menu when clicking outside
		document.addEventListener('click', function (event) {
			const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
			if (!isClickInsideNav && navMenu.classList.contains('nav__menu--active')) {
				navToggle.classList.remove('nav__toggle--active');
				navMenu.classList.remove('nav__menu--active');
				nav.classList.remove('nav--menu-open'); // прибираємо фон
			}
		});

		// Highlight the active link based on current page
		function setActiveNavLink() {
			const navLinks = document.querySelectorAll('.nav__link');

			// Normalize current page (remove .html, handle root)
			let currentPath = window.location.pathname.split('/').pop() || 'index';
			currentPath = currentPath.replace(/\.html$/, '') || 'index';

			navLinks.forEach(link => {
				// Normalize link href the same way
				let linkPath = link.getAttribute('href') || '';
				linkPath = linkPath.split('/').pop().replace(/\.html$/, '') || 'index';

				if (linkPath === currentPath) {
					link.classList.add('nav__link--active');
				} else {
					link.classList.remove('nav__link--active');
				}
			});
		}

		setActiveNavLink();
	}

	// Change header background and styles after scrolling hero height
	function updateNavOnScroll() {
		const hero = document.querySelector('.hero');
		const scrollY = window.scrollY;
		const heroHeight = hero ? hero.offsetHeight : window.innerHeight;

		// працює тільки якщо меню не відкрите
		if (!nav.classList.contains('nav--menu-open')) {
			if (scrollY >= heroHeight - 40) { // невеликий запас у 40px
				nav.classList.add('nav--scrolled');
			} else {
				nav.classList.remove('nav--scrolled');
			}
		}
	}

	// Attach scroll event listener
	window.addEventListener('scroll', updateNavOnScroll);
	window.addEventListener('resize', updateNavOnScroll); // на випадок зміни розмірів

	// Run on page load (in case user reloads in scrolled state)
	updateNavOnScroll();
});



// !Custom slider 

// document.addEventListener('DOMContentLoaded', () => {
// 	const slider = document.getElementById('testimonials-slider');
// 	const prevBtn = document.getElementById('prev-testimonial');
// 	const nextBtn = document.getElementById('next-testimonial');
// 	const cards = Array.from(slider.children);
// 	const gap = 20; // gap між картками у px

// 	let index = 0;
// 	let interval;
// 	let isDragging = false;
// 	let startX = 0;
// 	let currentTranslate = 0;
// 	let prevTranslate = 0;

// 	// Клонування для loop
// 	cards.forEach(card => slider.appendChild(card.cloneNode(true)));
// 	const allCards = Array.from(slider.children);

// 	function getVisible() {
// 		if (window.innerWidth >= 1200) return 3;
// 		if (window.innerWidth >= 768) return 2;
// 		return 1;
// 	}

// 	function cardWidth() {
// 		return allCards[0].offsetWidth + gap;
// 	}

// 	// Позитивний модуль для індексу
// 	function mod(n, m) {
// 		return ((n % m) + m) % m;
// 	}

// 	function setSliderPosition(instant = false) {
// 		slider.style.transition = instant ? 'none' : 'transform 0.6s ease';
// 		slider.style.transform = `translateX(${-index * cardWidth()}px)`;
// 	}

// 	let lastVisibleIndexes = [];

// 	function updateActiveClass() {
// 		const visible = getVisible();

// 		// Визначаємо індекси видимих слайдів
// 		const newVisible = [];
// 		for (let i = index; i < index + visible; i++) {
// 			newVisible.push(mod(i, allCards.length));
// 		}

// 		// Додаємо анімацію тільки новим слайдам
// 		newVisible.forEach(idx => {
// 			const card = allCards[idx];
// 			if (!card.classList.contains('active')) {
// 				card.classList.add('active');
// 				card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
// 				card.style.opacity = '0';
// 				card.style.transform = 'translateY(20px)';
// 				setTimeout(() => {
// 					card.style.opacity = '1';
// 					card.style.transform = 'translateY(0)';
// 				}, 50);
// 			}
// 		});

// 		// Скидаємо активність для тих, хто більше не в видимих
// 		lastVisibleIndexes.forEach(idx => {
// 			if (!newVisible.includes(idx)) {
// 				const card = allCards[idx];
// 				card.classList.remove('active');
// 			}
// 		});

// 		lastVisibleIndexes = newVisible.slice();
// 	}

// 	function nextSlide() {
// 		index++;
// 		setSliderPosition();
// 		updateActiveClass();

// 		if (index >= cards.length) {
// 			setTimeout(() => {
// 				index = 0;
// 				setSliderPosition(true);
// 				updateActiveClass();
// 			}, 610);
// 		}
// 	}

// 	function prevSlide() {
// 		index--;
// 		setSliderPosition();
// 		updateActiveClass();

// 		if (index < 0) {
// 			setTimeout(() => {
// 				index = cards.length - 1;
// 				setSliderPosition(true);
// 				updateActiveClass();
// 			}, 610);
// 		}
// 	}

// 	function startAuto() {
// 		stopAuto();
// 		interval = setInterval(() => {
// 			if (!isDragging) nextSlide();
// 		}, 5000);
// 	}

// 	function stopAuto() {
// 		clearInterval(interval);
// 	}

// 	// Drag / swipe
// 	function touchStart(e) {
// 		stopAuto();
// 		isDragging = true;
// 		startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
// 		prevTranslate = -index * cardWidth();
// 		slider.classList.add('dragging');
// 	}

// 	function touchMove(e) {
// 		if (!isDragging) return;
// 		const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
// 		const dx = x - startX;
// 		currentTranslate = prevTranslate + dx;
// 		slider.style.transition = 'none';
// 		slider.style.transform = `translateX(${currentTranslate}px)`;
// 	}

// 	function touchEnd() {
// 		isDragging = false;
// 		slider.classList.remove('dragging');
// 		const movedBy = currentTranslate - prevTranslate;

// 		if (movedBy < -50) nextSlide();
// 		else if (movedBy > 50) prevSlide();
// 		else {
// 			setSliderPosition();
// 			updateActiveClass();
// 		}

// 		startAuto();
// 	}

// 	// Drag / swipe події
// 	slider.addEventListener('mousedown', touchStart);
// 	slider.addEventListener('mousemove', touchMove);
// 	slider.addEventListener('mouseup', touchEnd);
// 	slider.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });

// 	slider.addEventListener('touchstart', touchStart);
// 	slider.addEventListener('touchmove', touchMove);
// 	slider.addEventListener('touchend', touchEnd);

// 	// Кнопки
// 	nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });
// 	prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });

// 	// Resize
// 	window.addEventListener('resize', () => setSliderPosition(true));

// 	// Старт
// 	setSliderPosition(true);
// 	updateActiveClass();
// 	startAuto();
// });









// Learning Paths Tabs
document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelectorAll('.learning-paths__tab');
	const panels = document.querySelectorAll('.learning-paths__panel');

	tabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetTab = this.getAttribute('data-tab');

			// Remove active class from all tabs and panels
			tabs.forEach(t => t.classList.remove('learning-paths__tab--active'));
			panels.forEach(p => {
				p.classList.remove('learning-paths__panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('learning-paths__tab--active');
			const targetPanel = document.getElementById(targetTab);
			if (targetPanel) {
				targetPanel.classList.add('learning-paths__panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach(link => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href === '#') return;

			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
});

// Intersection Observer for Animations
// document.addEventListener('DOMContentLoaded', function () {
// 	const observerOptions = {
// 		threshold: 0.1,
// 		rootMargin: '0px 0px -50px 0px'
// 	};

// 	const observer = new IntersectionObserver(function (entries) {
// 		entries.forEach(entry => {
// 			if (entry.isIntersecting) {
// 				entry.target.style.opacity = '1';
// 				entry.target.style.transform = 'translateY(0)';
// 			}
// 		});
// 	}, observerOptions);

// 	// Observe cards and sections for animations
// 	const animatedElements = document.querySelectorAll('.feature-card, .stats-card, .testimonial-card, .technology-card, .learning-card, .doc-card, .tutorial-card');
// 	animatedElements.forEach(el => {
// 		el.style.opacity = '0';
// 		el.style.transform = 'translateY(20px)';
// 		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
// 		observer.observe(el);
// 	});
// });

// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', function () {
	const newsletterButton = document.querySelector('.newsletter__button');
	const newsletterInput = document.querySelector('.newsletter__input');

	if (newsletterButton && newsletterInput) {
		newsletterButton.addEventListener('click', function (e) {
			e.preventDefault();
			const email = newsletterInput.value.trim();

			if (!email) {
				// Show validation message
				showNewsletterMessage('Please enter your email address.', 'error');
				return;
			}

			if (!isValidEmail(email)) {
				showNewsletterMessage('Please enter a valid email address.', 'error');
				return;
			}

			// Simulate form submission
			newsletterButton.textContent = 'Subscribing...';
			newsletterButton.disabled = true;

			setTimeout(function () {
				newsletterButton.textContent = 'Subscribed!';
				newsletterInput.value = '';
				showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');

				setTimeout(function () {
					newsletterButton.textContent = 'Subscribe';
					newsletterButton.disabled = false;
				}, 2000);
			}, 1500);
		});
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function showNewsletterMessage(message, type) {
		// Remove existing message
		const existingMessage = document.querySelector('.newsletter__message');
		if (existingMessage) {
			existingMessage.remove();
		}

		// Create new message
		const messageElement = document.createElement('div');
		messageElement.className = `newsletter__message newsletter__message--${type}`;
		messageElement.textContent = message;

		// Insert message inside the form
		const newsletterForm = document.querySelector('.newsletter__form');
		if (newsletterForm) {
			newsletterForm.appendChild(messageElement);

			// Remove message after 5 seconds
			setTimeout(function () {
				if (messageElement.parentNode) {
					messageElement.remove();
				}
			}, 5000);
		}
	}
});


// // Ticker Animation Control
// document.addEventListener('DOMContentLoaded', function () {
// 	const tickerTrack = document.getElementById('ticker-track');

// 	if (tickerTrack) {
// 		// Pause animation on hover
// 		tickerTrack.addEventListener('mouseenter', function () {
// 			this.style.animationPlayState = 'paused';
// 		});

// 		tickerTrack.addEventListener('mouseleave', function () {
// 			this.style.animationPlayState = 'running';
// 		});

// 		// Duplicate ticker items for seamless loop
// 		const tickerItems = tickerTrack.innerHTML;
// 		tickerTrack.innerHTML = tickerItems + tickerItems;
// 	}
// });

// Dynamic Stats Counter Animation
document.addEventListener('DOMContentLoaded', function () {
	const statsCards = document.querySelectorAll('.stats-card__number');

	const animateCounter = (element, target, suffix) => {
		let current = 0;
		const duration = 2000; // 2s
		const frameRate = 20;
		const totalFrames = duration / frameRate;
		const increment = target / totalFrames;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}

			let value;
			if (suffix === 'M+') value = current / 1_000_000;
			else if (suffix === 'K+') value = current / 1_000;
			else if (suffix === '%') value = current * 100;
			else value = current;

			// Якщо число ціле — не додаємо .0
			const formattedValue = Number.isInteger(value)
				? value.toString()
				: value.toFixed(2).replace(/\.?0+$/, '');

			element.textContent = formattedValue + suffix;
		}, frameRate);
	};

	const statsObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const element = entry.target;
				const originalText = element.textContent.trim();

				let target = 0;
				let suffix = '';

				if (originalText.includes('M+')) {
					target = parseFloat(originalText) * 1_000_000;
					suffix = 'M+';
				} else if (originalText.includes('K+')) {
					target = parseFloat(originalText) * 1_000;
					suffix = 'K+';
				} else if (originalText.includes('%')) {
					target = parseFloat(originalText) / 100;
					suffix = '%';
				} else if (originalText.includes('+')) {
					target = parseFloat(originalText);
					suffix = '+';
				} else {
					target = parseFloat(originalText);
					suffix = '';
				}

				animateCounter(element, target, suffix);
				statsObserver.unobserve(element);
			}
		});
	}, { threshold: 0.5 });

	statsCards.forEach(card => statsObserver.observe(card));
});

// Events Slider
document.addEventListener('DOMContentLoaded', function () {
	const eventsSlider = document.getElementById('events-slider');
	const prevEventBtn = document.getElementById('prev-event');
	const nextEventBtn = document.getElementById('next-event');

	if (eventsSlider && prevEventBtn && nextEventBtn) {
		const cards = eventsSlider.querySelectorAll('.event-card');
		let currentIndex = 0;
		const cardWidth = cards[0]?.offsetWidth + 32 || 432; // card width + gap

		function updateEventsSlider() {
			eventsSlider.scrollTo({
				left: currentIndex * cardWidth,
				behavior: 'smooth'
			});
		}

		nextEventBtn.addEventListener('click', function () {
			currentIndex = (currentIndex + 1) % cards.length;
			updateEventsSlider();
		});

		prevEventBtn.addEventListener('click', function () {
			currentIndex = (currentIndex - 1 + cards.length) % cards.length;
			updateEventsSlider();
		});

		// Auto-slide every 6 seconds
		setInterval(function () {
			currentIndex = (currentIndex + 1) % cards.length;
			updateEventsSlider();
		}, 6000);
	}
});

// FAQ Categories Tabs
document.addEventListener('DOMContentLoaded', function () {
	const faqTabs = document.querySelectorAll('.faq-categories__tab');
	const faqCategories = document.querySelectorAll('.faq-category');

	faqTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetCategory = this.getAttribute('data-category');

			// Remove active class from all tabs and categories
			faqTabs.forEach(t => t.classList.remove('faq-categories__tab--active'));
			faqCategories.forEach(c => {
				c.classList.remove('faq-category--active');
				c.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding category
			this.classList.add('faq-categories__tab--active');
			const targetCategoryElement = document.getElementById(targetCategory);
			if (targetCategoryElement) {
				targetCategoryElement.classList.add('faq-category--active');
				targetCategoryElement.style.display = 'block';
			}
		});
	});
});

// FAQ Items Toggle
document.addEventListener('DOMContentLoaded', function () {
	const faqItems = document.querySelectorAll('.faq-item');

	faqItems.forEach(item => {
		const question = item.querySelector('.faq-item__question');
		const answer = item.querySelector('.faq-item__answer');

		const toggleFAQ = () => {
			const isActive = item.classList.contains('faq-item--active');

			// Close other items in same section
			const currentSection = item.closest('.faq__section');
			if (currentSection) {
				currentSection.querySelectorAll('.faq-item').forEach(otherItem => {
					if (otherItem !== item) {
						otherItem.classList.remove('faq-item--active');
						const otherAnswer = otherItem.querySelector('.faq-item__answer');
						if (otherAnswer) {
							otherAnswer.style.maxHeight = '0px';
							otherAnswer.style.paddingTop = '0';
							otherAnswer.style.paddingBottom = '0';
						}
					}
				});
			}

			if (!isActive) {
				item.classList.add('faq-item--active');
				if (answer) {
					// Set padding first
					const paddingTop = 16; // 1rem in px
					const paddingBottom = 24; // 1.5rem in px
					answer.style.paddingTop = paddingTop + 'px';
					answer.style.paddingBottom = paddingBottom + 'px';

					// Animate max-height including padding
					const totalHeight = answer.scrollHeight + paddingTop + paddingBottom;
					answer.style.maxHeight = totalHeight + 'px';
				}
			} else {
				item.classList.remove('faq-item--active');
				if (answer) {
					// Animate closing
					const paddingTop = parseInt(getComputedStyle(answer).paddingTop);
					const paddingBottom = parseInt(getComputedStyle(answer).paddingBottom);

					answer.style.maxHeight = answer.scrollHeight + paddingTop + paddingBottom + 'px';
					answer.offsetHeight; // reflow
					answer.style.maxHeight = '0px';
					answer.style.paddingTop = '0';
					answer.style.paddingBottom = '0';
				}
			}
		};

		if (question) question.addEventListener('click', toggleFAQ);
		item.addEventListener('keydown', e => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleFAQ();
			}
		});
	});
});







// FAQ Search Functionality
document.addEventListener('DOMContentLoaded', function () {
	const searchButton = document.querySelector('.faq-search__button');
	const searchInput = document.querySelector('.faq-search__input');
	const noResultsSection = document.getElementById('faq-no-results');
	const clearSearchBtn = document.getElementById('clear-search-btn');
	const faqCategories = document.querySelectorAll('.faq-category');
	const faqTabs = document.querySelectorAll('.faq-categories__tab');

	if (searchButton && searchInput) {
		let originalContent = new Map();
		let isSearchActive = false;

		// Store original content
		const faqItems = document.querySelectorAll('.faq-item');
		faqItems.forEach(item => {
			const question = item.querySelector('.faq-item__question h3');
			const answer = item.querySelector('.faq-item__answer p');
			if (question && answer) {
				originalContent.set(item, {
					question: question.innerHTML,
					answer: answer.innerHTML
				});
			}
		});

		function highlightText(text, searchTerm) {
			if (!searchTerm) return text;

			const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
			return text.replace(regex, '<mark>$1</mark>');
		}

		function scrollToElement(element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}

		function resetToGeneral() {
			// Reset to General tab
			faqTabs.forEach(tab => tab.classList.remove('faq-categories__tab--active'));
			faqCategories.forEach(category => {
				category.classList.remove('faq-category--active');
				category.style.display = 'none';
			});

			// Activate General tab and category
			const generalTab = document.querySelector('[data-category="general"]');
			const generalCategory = document.getElementById('general');

			if (generalTab && generalCategory) {
				generalTab.classList.add('faq-categories__tab--active');
				generalCategory.classList.add('faq-category--active');
				generalCategory.style.display = 'block';
			}
		}

		function clearSearch() {
			searchInput.value = '';
			isSearchActive = false;

			// Hide no results section
			noResultsSection.style.display = 'none';

			// Reset all FAQ items to original content
			faqItems.forEach(item => {
				const original = originalContent.get(item);
				if (original) {
					const question = item.querySelector('.faq-item__question h3');
					const answer = item.querySelector('.faq-item__answer p');
					if (question && answer) {
						question.innerHTML = original.question;
						answer.innerHTML = original.answer;
					}
				}
				item.style.display = 'block';
				item.classList.remove('faq-item--highlighted');
			});

			// Reset to General category
			resetToGeneral();

			// Scroll to General category
			const generalCategory = document.getElementById('general');
			if (generalCategory) {
				setTimeout(() => {
					scrollToElement(generalCategory);
				}, 1000);
			}
		}

		function performSearch() {
			const searchTerm = searchInput.value.trim().toLowerCase();

			if (!searchTerm) {
				clearSearch();
				return;
			}

			isSearchActive = true;
			let foundResults = false;

			// Hide all categories first
			faqCategories.forEach(category => {
				category.style.display = 'none';
				category.classList.remove('faq-category--active');
			});

			// Remove active state from all tabs
			faqTabs.forEach(tab => tab.classList.remove('faq-categories__tab--active'));

			// Show all categories for search
			faqCategories.forEach(category => {
				category.style.display = 'block';
			});

			faqItems.forEach(item => {
				const original = originalContent.get(item);
				if (!original) return;

				const questionText = original.question.toLowerCase();
				const answerText = original.answer.toLowerCase();

				if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
					// Highlight matches
					const question = item.querySelector('.faq-item__question h3');
					const answer = item.querySelector('.faq-item__answer p');

					if (question && answer) {
						question.innerHTML = highlightText(original.question, searchTerm);
						answer.innerHTML = highlightText(original.answer, searchTerm);
					}

					item.style.display = 'block';
					item.classList.add('faq-item--highlighted');
					foundResults = true;
				} else {
					item.style.display = 'none';
					item.classList.remove('faq-item--highlighted');
				}
			});

			if (!foundResults) {
				// Show no results section
				noResultsSection.style.display = 'block';

				// Scroll to no results section
				setTimeout(() => {
					scrollToElement(noResultsSection);
				}, 1000);
			} else {
				// Hide no results section
				noResultsSection.style.display = 'none';

				// Scroll to first visible result
				const firstVisibleItem = Array.from(faqItems).find(item =>
					item.style.display !== 'none'
				);
				if (firstVisibleItem) {
					setTimeout(() => {
						scrollToElement(firstVisibleItem);
					}, 1000);
				}
			}
		}

		// Clear search button event
		if (clearSearchBtn) {
			clearSearchBtn.addEventListener('click', function () {
				clearSearch();
			});
		}

		searchButton.addEventListener('click', function (e) {
			e.preventDefault();
			performSearch();
		});

		// Real-time search on input
		searchInput.addEventListener('input', function () {
			// Add small delay for better performance
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				performSearch();
			}, 1000);
		});

		// Search on Enter key
		searchInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				performSearch();
			}
		});

		// Prevent tab switching during active search
		faqTabs.forEach(tab => {
			tab.addEventListener('click', function (e) {
				if (isSearchActive && searchInput.value.trim()) {
					e.preventDefault();
					return false;
				}
			});
		});
	}
});

// Mainnet Features Tabs
document.addEventListener('DOMContentLoaded', function () {
	const mainnetTabs = document.querySelectorAll('.mainnet-features__tab');
	const mainnetPanels = document.querySelectorAll('.mainnet-features__panel');

	mainnetTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetFeature = this.getAttribute('data-feature');

			// Remove active class from all tabs and panels
			mainnetTabs.forEach(t => t.classList.remove('mainnet-features__tab--active'));
			mainnetPanels.forEach(p => {
				p.classList.remove('mainnet-features__panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('mainnet-features__tab--active');
			const targetPanel = document.getElementById(targetFeature);
			if (targetPanel) {
				targetPanel.classList.add('mainnet-features__panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Explorer Tabs
document.addEventListener('DOMContentLoaded', function () {
	const explorerTabs = document.querySelectorAll('.explorer-tabs__tab');
	const explorerPanels = document.querySelectorAll('.explorer-panel');

	explorerTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetExplorer = this.getAttribute('data-explorer');

			// Remove active class from all tabs and panels
			explorerTabs.forEach(t => t.classList.remove('explorer-tabs__tab--active'));
			explorerPanels.forEach(p => {
				p.classList.remove('explorer-panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('explorer-tabs__tab--active');
			const targetPanel = document.getElementById(targetExplorer);
			if (targetPanel) {
				targetPanel.classList.add('explorer-panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Installation Guide Tabs
document.addEventListener('DOMContentLoaded', function () {
	const installationTabs = document.querySelectorAll('.installation-guide__tab');
	const installationPanels = document.querySelectorAll('.installation-guide__panel');

	installationTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetGuide = this.getAttribute('data-guide');

			// Remove active class from all tabs and panels
			installationTabs.forEach(t => t.classList.remove('installation-guide__tab--active'));
			installationPanels.forEach(p => {
				p.classList.remove('installation-guide__panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('installation-guide__tab--active');
			const targetPanel = document.getElementById(targetGuide);
			if (targetPanel) {
				targetPanel.classList.add('installation-guide__panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Auto-detect OS for Download Page
// document.addEventListener('DOMContentLoaded', function () {
// 	const autoDownloadBtn = document.getElementById('auto-download');

// 	if (autoDownloadBtn) {
// 		// Detect user's operating system
// 		let os = 'Unknown';
// 		if (navigator.userAgent.indexOf('Win') !== -1) os = 'Windows';
// 		if (navigator.userAgent.indexOf('Mac') !== -1) os = 'macOS';
// 		if (navigator.userAgent.indexOf('Linux') !== -1) os = 'Linux';

// 		// Update button text
// 		if (os !== 'Unknown') {
// 			autoDownloadBtn.textContent = `Download for ${os}`;
// 		}

// 		// Handle download click
// 		autoDownloadBtn.addEventListener('click', function () {
// 			// Simulate download start
// 			this.textContent = 'Downloading...';
// 			this.disabled = true;

// 			setTimeout(() => {
// 				this.textContent = `Download for ${os}`;
// 				this.disabled = false;
// 				alert(`Download started for ${os}!`);
// 			}, 2000);
// 		});
// 	}
// });

// Download Card Interactions
document.addEventListener('DOMContentLoaded', function () {
	const downloadButtons = document.querySelectorAll('.download-card__button');

	downloadButtons.forEach(button => {
		button.addEventListener('click', function () {
			const card = this.closest('.download-card');
			const os = card.getAttribute('data-os');

			// Simulate download
			const originalText = this.innerHTML;
			this.innerHTML = '<svg class="download-card__button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4-2"></path></svg>Downloading...';
			this.disabled = true;

			setTimeout(() => {
				this.innerHTML = originalText;
				this.disabled = false;
				alert(`Download started for ${os}!`);
			}, 2000);
		});
	});
});


// Network Status Real-time Updates
document.addEventListener('DOMContentLoaded', function () {
	const tpsCounter = document.getElementById('tps-counter');
	const activityCounter = document.getElementById('nodes-counter'); // перейменовано в Network Activity

	// Функція анімованої зміни числа
	function animateValue(el, start, end, duration) {
		const range = end - start;
		const startTime = performance.now();

		function step(currentTime) {
			const progress = Math.min((currentTime - startTime) / duration, 1);
			const value = Math.floor(start + range * progress);
			el.textContent = value.toLocaleString();

			if (progress < 1) {
				requestAnimationFrame(step);
			}
		}
		requestAnimationFrame(step);
	}

	// --- TPS ---
	if (tpsCounter) {
		let currentTps = parseInt(tpsCounter.textContent.replace(',', ''), 10) || 20;

		setInterval(() => {
			const newTps = Math.floor(Math.random() * (28 - 18 + 1)) + 18;
			animateValue(tpsCounter, currentTps, newTps, 1000);
			currentTps = newTps;
		}, 3000);
	}

	// --- Network Activity ---
	if (activityCounter) {
		let currentActivity = parseInt(activityCounter.textContent.replace(',', ''), 10) || 398;

		setInterval(() => {
			const newActivity = Math.floor(Math.random() * (400 - 397 + 1)) + 397;
			animateValue(activityCounter, currentActivity, newActivity, 1500);
			currentActivity = newActivity;
		}, 10000);
	}
});


// Network Map Node Tooltips
document.addEventListener('DOMContentLoaded', function () {
	const networkNodes = document.querySelectorAll('.network-map__node');

	networkNodes.forEach(node => {
		node.addEventListener('mouseenter', function () {
			const region = this.getAttribute('data-region');

			// Create tooltip
			const tooltip = document.createElement('div');
			tooltip.className = 'network-tooltip';
			tooltip.textContent = region;
			tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -100%);
                margin-top: -10px;
            `;

			this.appendChild(tooltip);
		});

		node.addEventListener('mouseleave', function () {
			const tooltip = this.querySelector('.network-tooltip');
			if (tooltip) {
				tooltip.remove();
			}
		});
	});
});

// Explorer Search Functionality
document.addEventListener('DOMContentLoaded', function () {
	const explorerSearchButton = document.querySelector('.explorer-search__button');
	const explorerSearchInput = document.querySelector('.explorer-search__input');

	if (explorerSearchButton && explorerSearchInput) {
		explorerSearchButton.addEventListener('click', function (e) {
			e.preventDefault();
			const searchTerm = explorerSearchInput.value.trim();

			if (!searchTerm) {
				alert('Please enter a search term.');
				return;
			}

			// Simulate search
			this.textContent = 'Searching...';
			this.disabled = true;

			setTimeout(() => {
				this.textContent = 'Search';
				this.disabled = false;

				if (searchTerm.length < 10) {
					alert('Please enter a valid transaction hash, address, or bundle ID.');
				} else {
					alert(`Search results for: ${searchTerm}`);
				}
			}, 1500);
		});

		// Search on Enter key
		explorerSearchInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				explorerSearchButton.click();
			}
		});
	}
});

// Privacy Policy Tabs
document.addEventListener('DOMContentLoaded', function () {
	const privacyTabs = document.querySelectorAll('.privacy-sections__tab');
	const privacyPanels = document.querySelectorAll('.privacy-sections__panel');

	privacyTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetSection = this.getAttribute('data-section');

			// Remove active class from all tabs and panels
			privacyTabs.forEach(t => t.classList.remove('privacy-sections__tab--active'));
			privacyPanels.forEach(p => {
				p.classList.remove('privacy-sections__panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('privacy-sections__tab--active');
			const targetPanel = document.getElementById(targetSection);
			if (targetPanel) {
				targetPanel.classList.add('privacy-sections__panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Terms of Use Tabs
document.addEventListener('DOMContentLoaded', function () {
	const termsTabs = document.querySelectorAll('.terms-navigation__tab');
	const termsPanels = document.querySelectorAll('.terms-navigation__panel');

	termsTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetTerms = this.getAttribute('data-terms');

			// Remove active class from all tabs and panels
			termsTabs.forEach(t => t.classList.remove('terms-navigation__tab--active'));
			termsPanels.forEach(p => {
				p.classList.remove('terms-navigation__panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('terms-navigation__tab--active');
			const targetPanel = document.getElementById(targetTerms);
			if (targetPanel) {
				targetPanel.classList.add('terms-navigation__panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Impressum Regulatory Tabs
document.addEventListener('DOMContentLoaded', function () {
	const regulatoryTabs = document.querySelectorAll('.regulatory-tabs__tab');
	const regulatoryPanels = document.querySelectorAll('.regulatory-panel');

	regulatoryTabs.forEach(tab => {
		tab.addEventListener('click', function () {
			const targetRegulatory = this.getAttribute('data-regulatory');

			// Remove active class from all tabs and panels
			regulatoryTabs.forEach(t => t.classList.remove('regulatory-tabs__tab--active'));
			regulatoryPanels.forEach(p => {
				p.classList.remove('regulatory-panel--active');
				p.style.display = 'none';
			});

			// Add active class to clicked tab and corresponding panel
			this.classList.add('regulatory-tabs__tab--active');
			const targetPanel = document.getElementById(targetRegulatory);
			if (targetPanel) {
				targetPanel.classList.add('regulatory-panel--active');
				targetPanel.style.display = 'block';
			}
		});
	});
});

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.btn, .learning-card__button, .doc-card__button, .step-card__button, .platform-card__button, .event-card__button');

	buttons.forEach(button => {
		button.addEventListener('click', function (e) {
			// Create ripple effect
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

			this.style.position = 'relative';
			this.style.overflow = 'hidden';
			this.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	});

	// Add ripple animation CSS
	const style = document.createElement('style');
	style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
	document.head.appendChild(style);
});

// // Video Tutorial Play Simulation
// document.addEventListener('DOMContentLoaded', function () {
// 	const playButtons = document.querySelectorAll('.tutorial-card__play');

// 	playButtons.forEach(button => {
// 		button.addEventListener('click', function () {
// 			const card = this.closest('.tutorial-card');
// 			const title = card.querySelector('.tutorial-card__title')?.textContent;

// 			// Simulate video play
// 			this.textContent = '⏸️';
// 			setTimeout(() => {
// 				this.textContent = '▶';
// 				alert(`Playing: ${title || 'Tutorial Video'}`);
// 			}, 1000);
// 		});
// 	});
// });

// // Form Validation and Enhancement
// document.addEventListener('DOMContentLoaded', function () {
// 	const inputs = document.querySelectorAll('input[type="email"], input[type="text"]');

// 	inputs.forEach(input => {
// 		// Add focus/blur effects
// 		input.addEventListener('focus', function () {
// 			this.style.borderColor = '#0101ff';
// 			this.style.boxShadow = '0 0 0 3px rgba(1, 1, 255, 0.1)';
// 		});

// 		input.addEventListener('blur', function () {
// 			this.style.borderColor = 'rgba(1, 1, 255, 0.2)';
// 			this.style.boxShadow = 'none';
// 		});
// 	});
// });

// Network Visualization Animation Enhancement
document.addEventListener('DOMContentLoaded', function () {
	const networkNodes = document.querySelectorAll('.network-node');
	const tangleNodes = document.querySelectorAll('.tangle-node');

	// Add random animation delays for more natural look
	[...networkNodes, ...tangleNodes].forEach((node, index) => {
		node.style.animationDelay = `${index * 0.3}s`;
	});
});

//========================================================================================================================================================

//! year in footer
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("year").textContent = new Date().getFullYear();
});

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', function () {
	const sidebarLinks = document.querySelectorAll('.docs-sidebar__link');
	const sections = document.querySelectorAll('.docs-section');

	function switchSection(targetSectionId, scroll = true) {
		sections.forEach(section => {
			section.classList.remove('docs-section--active');
		});

		sidebarLinks.forEach(link => {
			link.classList.remove('docs-sidebar__link--active');
		});

		const targetSection = document.getElementById(targetSectionId);
		if (targetSection) {
			targetSection.classList.add('docs-section--active');

			// Додаємо хеш у URL без перезавантаження
			history.pushState(null, '', `#${targetSectionId}`);

			// Прокручуємо до початку активного розділу
			if (scroll) {
				const offsetTop = targetSection.offsetTop;
				window.scrollTo({
					top: offsetTop - 100, // невеликий відступ зверху
					behavior: 'smooth'
				});
			}
		}

		const activeLink = document.querySelector(`[data-section="${targetSectionId}"]`);
		if (activeLink) {
			activeLink.classList.add('docs-sidebar__link--active');
		}
	}

	sidebarLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const targetSection = this.getAttribute('data-section');
			switchSection(targetSection);
		});
	});

	// Копіювання коду
	const copyButtons = document.querySelectorAll('.docs-code__copy');
	copyButtons.forEach(button => {
		button.addEventListener('click', function () {
			const code = this.getAttribute('data-code');
			if (code) {
				copyToClipboard(code, this);
			}
		});
	});

	function copyToClipboard(text, button) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				const originalText = button.textContent;
				button.textContent = 'Copied!';
				setTimeout(() => {
					button.textContent = originalText;
				}, 2000);
			});
		}
	}

	// Якщо при відкритті вже є хеш — активуємо відповідний розділ
	const hash = window.location.hash.substring(1);
	if (hash) {
		switchSection(hash, false);
	} else if (sections[0]) {
		const firstSection = sections[0].id;
		switchSection(firstSection, false);
	}

	// Реагуємо на зміну хешу (наприклад, при натисканні "Назад")
	window.addEventListener('hashchange', function () {
		const hash = window.location.hash.substring(1);
		if (hash) {
			switchSection(hash);
		}
	});
});

