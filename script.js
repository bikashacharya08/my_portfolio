document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header scroll detection ---------- */
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    const onScroll = () => {
        const y = window.scrollY;
        if (y > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile nav toggle ---------- */
    const toggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = navList ? navList.querySelectorAll('a') : [];

    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('open');
            document.body.classList.toggle('nav-open');
        });

        const closeNav = () => {
            toggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('open');
            document.body.classList.remove('nav-open');
        };

        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('open')) {
                closeNav();
                toggle.focus();
            }
        });
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contact-form');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMsg = document.querySelector('.form-success');

        /* Secure input: strip HTML tags to prevent XSS */
        const sanitize = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.textContent;
        };

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const showError = (input, msg) => {
            const error = input.parentElement.querySelector('.form-error');
            input.classList.add('error');
            if (error) {
                error.textContent = msg;
                error.classList.add('visible');
            }
        };

        const clearError = (input) => {
            const error = input.parentElement.querySelector('.form-error');
            input.classList.remove('error');
            if (error) {
                error.textContent = '';
                error.classList.remove('visible');
            }
        };

        const validateField = (input) => {
            const val = input.value.trim();
            if (!val) {
                showError(input, 'This field is required.');
                return false;
            }
            if (input === emailInput && !validateEmail(val)) {
                showError(input, 'Please enter a valid email address.');
                return false;
            }
            if (input === nameInput && val.length < 2) {
                showError(input, 'Name must be at least 2 characters.');
                return false;
            }
            clearError(input);
            return true;
        };

        nameInput.addEventListener('blur', () => validateField(nameInput));
        emailInput.addEventListener('blur', () => validateField(emailInput));
        messageInput.addEventListener('blur', () => validateField(messageInput));

        nameInput.addEventListener('input', () => {
            if (nameInput.classList.contains('error')) validateField(nameInput);
        });
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('error')) validateField(emailInput);
        });
        messageInput.addEventListener('input', () => {
            if (messageInput.classList.contains('error')) validateField(messageInput);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            clearError(nameInput);
            clearError(emailInput);
            clearError(messageInput);
            if (successMsg) successMsg.classList.remove('visible');

            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isMessageValid = validateField(messageInput);

            if (!isNameValid || !isEmailValid || !isMessageValid) return;

            /* Build safe payload */
            const payload = {
                name: sanitize(nameInput.value.trim()),
                email: sanitize(emailInput.value.trim()),
                message: sanitize(messageInput.value.trim())
            };

            console.log('Form payload (replace with your API endpoint):', payload);

            if (successMsg) {
                successMsg.textContent = 'Message received. I\'ll respond within 48 hours.';
                successMsg.classList.add('visible');
            }

            form.reset();
        });
    }
});
