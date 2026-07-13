document.addEventListener('DOMContentLoaded', () => {
    const exploitBtn = document.getElementById('exploit-btn');
    let physicsInitialized = false;

    exploitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!physicsInitialized) {
            initChaosPhysics();
            physicsInitialized = true;
            exploitBtn.querySelector('.prompt').textContent = '>';
            exploitBtn.innerHTML = '<span class="prompt">></span> root access granted...';
            exploitBtn.style.color = 'var(--accent-error)';
            exploitBtn.style.borderColor = 'var(--accent-error)';
        }
    });

    function initChaosPhysics() {
        // Add active class to body and canvas
        document.body.classList.add('physics-active');
        const canvas = document.getElementById('physics-canvas');
        canvas.classList.add('active');

        // Aliases for Matter.js
        const Engine = Matter.Engine,
              Render = Matter.Render,
              Runner = Matter.Runner,
              Bodies = Matter.Bodies,
              Composite = Matter.Composite,
              Mouse = Matter.Mouse,
              MouseConstraint = Matter.MouseConstraint,
              Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;

        // Setup renderer (transparent to see DOM behind)
        const render = Render.create({
            element: canvas,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        Render.run(render);

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Gather all elements to apply physics to
        const domElements = document.querySelectorAll('.physics-element, .physics-text');
        const bodiesMap = [];

        // Add borders to keep elements on screen
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
        const ceiling = Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth * 2, 100, wallOptions);
        
        Composite.add(world, [ground, leftWall, rightWall, ceiling]);

        // Process elements
        domElements.forEach((el) => {
            // Get current dimensions and position
            const rect = el.getBoundingClientRect();
            
            // Skip elements that are hidden or 0 size
            if (rect.width === 0 || rect.height === 0) return;

            // Fix dimensions before removing from flow
            el.style.width = `${rect.width}px`;
            el.style.height = `${rect.height}px`;

            // Create physics body
            const body = Bodies.rectangle(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                rect.width,
                rect.height,
                {
                    restitution: 0.7, // Bounciness
                    friction: 0.05,
                    frictionAir: 0.01,
                    render: { visible: false } // Hide physics bodies, show DOM
                }
            );

            // Set DOM element to fixed positioning relative to viewport
            el.style.position = 'fixed';
            el.style.margin = '0';
            el.style.left = '0px';
            el.style.top = '0px';
            el.style.zIndex = '1000';

            // Store pair
            bodiesMap.push({ dom: el, body: body, width: rect.width, height: rect.height });

            // Add body to world
            Composite.add(world, body);
        });

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Sync DOM elements with physics bodies on every update
        Events.on(engine, 'afterUpdate', function() {
            for (let i = 0; i < bodiesMap.length; i++) {
                const pair = bodiesMap[i];
                const dom = pair.dom;
                const body = pair.body;

                // Position DOM element to match physics body
                const x = body.position.x - pair.width / 2;
                const y = body.position.y - pair.height / 2;
                
                dom.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
            }
        });

        // Handle window resize (update walls)
        window.addEventListener('resize', () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            
            Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
            Matter.Body.setVertices(ground, Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100).vertices);
            
            Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
            Matter.Body.setVertices(rightWall, Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2).vertices);
        });
    }
});
