/* ============================================
   Bikash Acharya — Portfolio CV
   Safe DOM rendering · Interactions · Theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       DATA
       ============================================= */

    const skillsData = [
        {
            category: 'Web Engineering',
            items: ['HTML5 / CSS3 / JavaScript (ES6+)',
                    'React & Next.js',
                    'Node.js & Express',
                    'REST API Design & Integration',
                    'Responsive & Accessible Architecture']
        },
        {
            category: 'Defensive Security / Hacking Theory',
            items: ['Network Security & Vulnerability Scanning',
                    'Web Application Pentesting (OWASP Top 10)',
                    'Cryptography Fundamentals',
                    'CTF Challenges (HTB, PWK Labs)',
                    'Secure Coding & Input Sanitisation']
        },
        {
            category: 'Hospitality Operations',
            items: ['Digital Tourism Strategy',
                    'Ethical & Community-Driven Hospitality Models',
                    'Brand Strategy & Visual Design',
                    'Content Strategy & Localisation',
                    'Project Management & Cross-Functional Coordination']
        }
    ];

    const educationData = [
        {
            level: 'Postgraduate Studies (Current)',
            degree: 'Master of Science in Computer Science and Information Technology (M.Sc. CSIT)',
            institution: 'Tribhuvan University',
            status: 'In Progress',
            specialization: 'Advanced Operating Systems, Software Engineering, Cybersecurity & Advanced Computing',
            timeline: 'Present'
        },
        {
            level: 'Undergraduate Degree',
            degree: 'Bachelor of Science in Computer Science and Information Technology (B.Sc. CSIT)',
            institution: 'Birendra Multiple Campus, Bharatpur (Tribhuvan University)',
            status: 'Graduated (2023)',
            transcriptDetails: { aggregatePercentage: '68.48%', division: 'Second Division', totalCreditHours: 126, grandTotalMarks: '2876 / 4200' },
            keyHighlightedCourses: ['Cryptography', 'Web Technology', 'Computer Networks', 'Operating Systems', 'Artificial Intelligence', 'Database Management System', 'Software Engineering'],
            semesters: [
                {
                    semester: 'First Year (Sem 1 & 2)',
                    courses: ['Introduction to IT (76)', 'C Programming (70)', 'Digital Logic (71)', 'Mathematics I (68)', 'Physics (83)', 'Discrete Structure (60)', 'Object Oriented Programming (68)', 'Microprocessor (62)', 'Mathematics II (52)', 'Statistics I (64)']
                },
                {
                    semester: 'Second Year (Sem 3 & 4)',
                    courses: ['Data Structures & Algorithms (64)', 'Numerical Method (60)', 'Computer Architecture (60)', 'Computer Graphics (65)', 'Statistics II (67)', 'Theory of Computation (65)', 'Computer Networks (74)', 'Operating Systems (72)', 'Database Management System (77)', 'Artificial Intelligence (74)']
                },
                {
                    semester: 'Third Year (Sem 5 & 6)',
                    courses: ['Design & Analysis of Algorithms (67)', 'System Analysis & Design (70)', 'Cryptography (62)', 'Simulation & Modeling (72)', 'Web Technology (71)', 'Society & Ethics in IT (73)', 'Software Engineering (67)', 'Compiler Design (68)', 'E-Governance (62)', 'NET Centric Computing (74)', 'Technical Writing (56)', 'E-Commerce (66)']
                },
                {
                    semester: 'Fourth Year (Sem 7 & 8)',
                    courses: ['Advanced Java Programming (60)', 'Data Warehousing & Mining (65)', 'Principles of Management (54)', 'Project Work (88)', 'Software Project Management (76)', 'Advanced Database (59)', 'Internship (172/200)', 'Cloud Computing (73)', 'Geographical Information System (69)']
                }
            ]
        },
        {
            level: 'Higher Secondary (Class XI & XII)',
            degree: 'School Leaving Certificate Examination (Science Stream)',
            institution: 'Skyrider English Boarding Secondary School, Chitwan',
            status: 'Completed (2018)',
            transcriptDetails: { class11Gpa: 2.96, class12Gpa: 3.22, cumulativeGpa: 3.09 },
            keyHighlightedCourses: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry']
        },
        {
            level: 'Secondary Education (Class X)',
            degree: 'School Leaving Certificate (SLC)',
            institution: 'Shree Little Star English Boarding School, Chitwan',
            status: 'Completed (2016)',
            transcriptDetails: { gradePointAverage: 3.50 },
            keyHighlightedCourses: ['Compulsory Mathematics', 'Optional Additional Mathematics', 'Science', 'Computer Science']
        }
    ];

    /* =============================================
       UTILITY — safe element factory
       ============================================= */

    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach(key => {
                if (key === 'className') {
                    node.className = attrs[key];
                } else if (key === 'textContent') {
                    node.textContent = attrs[key];
                } else if (key === 'htmlFor') {
                    node.setAttribute('for', attrs[key]);
                } else {
                    node.setAttribute(key, attrs[key]);
                }
            });
        }
        if (children) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    node.appendChild(document.createTextNode(child));
                } else if (child instanceof Node) {
                    node.appendChild(child);
                }
            });
        }
        return node;
    }

    /* =============================================
       THEME TOGGLE
       ============================================= */

    (function initTheme() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    })();

    /* =============================================
       HEADER SCROLL
       ============================================= */

    (function initScrollHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const check = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', check, { passive: true });
        check();
    })();

    /* =============================================
       MOBILE NAV
       ============================================= */

    (function initNav() {
        const toggle = document.getElementById('nav-toggle');
        const list = document.getElementById('nav-list');
        if (!toggle || !list) return;

        const close = () => {
            toggle.setAttribute('aria-expanded', 'false');
            list.classList.remove('open');
            document.body.classList.remove('nav-open');
        };

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            list.classList.toggle('open');
            document.body.classList.toggle('nav-open');
        });

        list.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', close);
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && list.classList.contains('open')) {
                close();
                toggle.focus();
            }
        });
    })();

    /* =============================================
       SKILLS GRID
       ============================================= */

    (function renderSkills() {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;

        skillsData.forEach(group => {
            const card = el('div', { className: 'skill-category' });

            const heading = el('h3', { textContent: group.category });
            card.appendChild(heading);

            const ul = document.createElement('ul');
            group.items.forEach(text => {
                const li = el('li', { textContent: text });
                ul.appendChild(li);
            });
            card.appendChild(ul);
            grid.appendChild(card);
        });
    })();

    /* =============================================
       EDUCATION TIMELINE
       ============================================= */

    (function renderTimeline() {
        const container = document.getElementById('timeline');
        if (!container) return;

        educationData.forEach((entry, index) => {

            /* -------- Item wrapper -------- */
            const item = el('div', { className: 'timeline-item' });

            /* -------- Header (clickable) -------- */
            const header = el('div', { className: 'timeline-header' });

            const marker = el('div', { className: 'timeline-marker' });
            header.appendChild(marker);

            const info = el('div', { className: 'timeline-info' });

            const level = el('p', { className: 'timeline-level', textContent: entry.level });
            info.appendChild(level);

            const degree = el('p', { className: 'timeline-degree', textContent: entry.degree });
            info.appendChild(degree);

            const institution = el('p', { className: 'timeline-institution', textContent: entry.institution });
            info.appendChild(institution);

            header.appendChild(info);

            const statusEl = el('span', { className: 'timeline-status', textContent: entry.status });
            header.appendChild(statusEl);

            const arrow = el('span', { className: 'timeline-arrow', textContent: '\u25BC' });
            header.appendChild(arrow);

            item.appendChild(header);

            /* -------- Body (expandable) -------- */
            const body = el('div', { className: 'timeline-body' });
            const inner = el('div', { className: 'timeline-body-inner' });

            if (entry.specialization) {
                const spec = el('p', { className: 'timeline-specialization', textContent: entry.specialization });
                inner.appendChild(spec);
            }

            if (entry.timeline) {
                const spec = el('p', { className: 'timeline-specialization', textContent: 'Timeline: ' + entry.timeline });
                inner.appendChild(spec);
            }

            /* -------- Transcript table -------- */
            if (entry.transcriptDetails) {
                const table = buildTranscriptTable(entry.transcriptDetails);
                inner.appendChild(table);
            }

            /* -------- Highlighted courses -------- */
            if (entry.keyHighlightedCourses && entry.keyHighlightedCourses.length) {
                const hlLabel = el('p', { className: 'course-sublabel', textContent: 'Key Courses' });
                inner.appendChild(hlLabel);

                const hlWrapper = el('div', { className: 'highlighted-courses' });
                entry.keyHighlightedCourses.forEach(c => {
                    const tag = el('span', { className: 'course-tag course-highlight', textContent: c });
                    hlWrapper.appendChild(tag);
                });
                inner.appendChild(hlWrapper);
            }

            /* -------- Semester breakdown -------- */
            if (entry.semesters && entry.semesters.length) {
                entry.semesters.forEach(sem => {
                    const semLabel = el('p', { className: 'course-sublabel', textContent: sem.semester });
                    inner.appendChild(semLabel);

                    const wrapper = el('div', { className: 'courses-list' });
                    sem.courses.forEach(c => {
                        const tag = el('span', { className: 'course-tag', textContent: c });
                        wrapper.appendChild(tag);
                    });
                    inner.appendChild(wrapper);
                });
            }

            body.appendChild(inner);
            item.appendChild(body);

            /* -------- Toggle -------- */
            header.addEventListener('click', () => {
                const currentlyOpen = item.classList.contains('open');
                item.classList.toggle('open');

                if (!currentlyOpen) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    body.style.maxHeight = '0';
                }
            });

            container.appendChild(item);
        });
    })();

    /* -------- Build transcript details table -------- */
    function buildTranscriptTable(details) {
        const table = document.createElement('table');
        table.className = 'transcript-table';

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Metric';
        const th2 = document.createElement('th');
        th2.textContent = 'Value';
        headRow.appendChild(th1);
        headRow.appendChild(th2);
        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        Object.keys(details).forEach(key => {
            const row = document.createElement('tr');
            const labelCell = document.createElement('td');

            const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())
                .replace(/([a-z])(\d)/g, '$1 $2');

            labelCell.textContent = label;
            const valCell = document.createElement('td');
            valCell.textContent = details[key];
            row.appendChild(labelCell);
            row.appendChild(valCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    }

    /* =============================================
       CONTACT FORM
       ============================================= */

    (function initForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMsg = document.querySelector('.form-success');

        const sanitize = str => {
            const d = document.createElement('div');
            d.textContent = str;
            return d.textContent;
        };

        const validateEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

        const showError = (input, msg) => {
            const error = input.parentElement.querySelector('.form-error');
            input.classList.add('error');
            if (error) {
                error.textContent = msg;
                error.classList.add('visible');
            }
        };

        const clearError = input => {
            const error = input.parentElement.querySelector('.form-error');
            input.classList.remove('error');
            if (error) {
                error.textContent = '';
                error.classList.remove('visible');
            }
        };

        const validateField = input => {
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

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) validateField(input);
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();

            [nameInput, emailInput, messageInput].forEach(clearError);
            if (successMsg) successMsg.classList.remove('visible');

            const valid = [nameInput, emailInput, messageInput].every(validateField);
            if (!valid) return;

            const payload = {
                name: sanitize(nameInput.value.trim()),
                email: sanitize(emailInput.value.trim()),
                message: sanitize(messageInput.value.trim())
            };

            console.log('Contact payload (connect to your API):', payload);

            if (successMsg) {
                successMsg.textContent = 'Thank you. I\'ll respond within 48 hours.';
                successMsg.classList.add('visible');
            }

            form.reset();
        });
    })();

});
