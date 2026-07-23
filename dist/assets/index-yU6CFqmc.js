(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const L=[{id:"hsi-hris",role:"Web Developer Intern",company:"Highly Succeed Inc.",period:"Feb 16 – May 13, 2026",location:"Mandaluyong City, Philippines",path:"~/highly-succeed-inc/hris-system",details:["Independently designed, developed, tested, and deployed a Human Resource Information System (HRIS) as a solo project.","Implemented authentication, employee management, and database-driven workflows.","Owned database design, CRUD operations, and overall system functionality.","Deployed and maintained the application on Vercel.","Worked with my supervisor and teammates to gather requirements and ship improvements."],stack:["JavaScript","TypeScript","Node.js","Supabase","PostgreSQL","Vercel"]}],S=[{id:"workzen-hris",title:"Workzen HRIS – Human Resource Information System",date:"Feb – May 2026",role:"Full Stack Developer",category:"fullstack",description:"A digital HR platform that brings employee and administrative functions into one system to enhance the management of employee and HR operations. Developed as a modern, integrated system to improve workforce and organizational management, digitizing core HR processes. Deployed and undergoing continuous improvement.",award:"⭐ Featured Project",tags:["JavaScript","TypeScript","Node.js","Supabase","Vercel"],demoUrl:"hris-project-beta.vercel.app",images:["/projects/hris-1.jpg","/projects/hris-2.jpg","/projects/hris-3.jpg","/projects/hris-4.jpg"]},{id:"kling-ordering-system",title:"Kling Ordering System – Digital Ordering & Management Platform",date:"Feb – May 2026",role:"Full Stack Developer (Team of 2)",category:"fullstack",description:"A full-stack ordering platform developed to simplify order processing and business management through a modern web application. The system enables customers to place orders seamlessly while providing administrators with tools to manage products, orders, and user accounts. Built with a scalable tech stack and optimized for performance, security, and responsive user experience.",award:"⭐ Featured Project",tags:["JavaScript","TypeScript","Node.js","Supabase","Vercel"],demoUrl:"https://kling-system.vercel.app/",images:["/projects/kling-1.jpg","/projects/kling-2.jpg","/projects/kling-3.jpg"]},{id:"tricypay",title:"TricyPay — Smart Transportation Management System",date:"Jan – Dec 2025",role:"Mobile & IoT Application Developer (Team)",category:"iot",description:"A smart fare system for Daet, Camarines Norte. Contributed to the mobile app and the IoT-enabled fare collection device, automating fare computation, payment processing, and change dispensing — cutting manual transaction errors and improving monitoring for TRU and PSTMU.",award:"🏆 Best in Capstone Project",tags:["IoT","Mobile App","Node.js","Fare Automation","Hardware Integration"],images:["/projects/tricypay-1.jpg","/projects/tricypay-2.jpg","/projects/tricypay-3.jpg","/projects/tricypay-4.jpg"]},{id:"tb-simulation",title:"Agent-Based Simulation and GIS Mapping of Tuberculosis Transmission",date:"December 2024",role:"Agent-Based Simulation Developer / Modeler • Daet, Camarines Norte",category:"fullstack",description:"Developed an agent-based simulation integrated with GIS to analyze TB transmission patterns. Mapped and identified high-prevalence barangays, including Alawihao and Bibirao. Modeled key factors such as mobility rates, infection probability, and healthcare accessibility. Supported forecasting and data-driven insights for public health assessment.",award:"⭐ Featured Research",tags:["Agent-Based Modeling","GIS Mapping","Simulation","Data Analysis","Public Health"],publicationUrl:"https://zenodo.org/records/14496751",images:["/projects/tb-sim-1.png","/projects/tb-sim-2.png","/projects/tb-sim-3.png"]},{id:"egg-sorting",title:"Autonomous Egg Quality Sorting System (IoT & Image Processing)",date:"Feb – Dec 2024",role:"IoT Developer (Team)",category:"iot",description:"Built on Raspberry Pi with image processing to classify duck eggs by size, quality, and shape. Automated the sorting process and added real-time monitoring and data logging to support inventory management.",tags:["Raspberry Pi","Python","Computer Vision","IoT","Data Logging"],images:["/projects/egg-sorting-1.jpg","/projects/egg-sorting-2.jpg"]},{id:"smart-airport",title:"Mactan Cebu International Smart IoT Airport",date:"2024",role:"IoT Developer (Team)",category:"iot",description:"A miniature model of the Mactan Cebu International Airport that demonstrates a smart airport system using IoT technology. Uses sensors and modules to simulate real airport operations, focusing on safety, efficiency, and energy optimization.",tags:["IoT","Sensors","Arduino","Smart Systems","Energy Optimization"],images:["/projects/airport-1.jpg","/projects/airport-2.jpg","/projects/airport-3.jpg"]},{id:"cam-commute-guru",title:"Cam Commute Guru — Tricycle Commuter Safety & Fare Assistance App",date:"Nov – Dec 2023",role:"UI/UX Designer (Academic)",category:"uiux",description:"Designed the UI/UX for a safer-commuting mobile app in Camarines Norte, including QR verification of drivers and vehicles, a fare calculator to prevent overcharging, and a secure incident-reporting flow.",tags:["Figma","UI/UX Design","User Research","Prototyping","Mobile UI"],demoUrl:"https://www.figma.com/design/s05VcTO5bV6JeZheL81szj/CAM-COMMUTE-GURU--FINAL-?node-id=0-1&t=1Ii4ylsu9o0kduPY-1"}],A=[{title:"Languages",tags:["JavaScript","TypeScript","Python","HTML5","CSS3"]},{title:"Frontend",tags:["HTML5","CSS3","TypeScript","Responsive Design","Vite","DOM API"]},{title:"Backend",tags:["Node.js","REST APIs","Authentication","Serverless"]},{title:"Database",tags:["Supabase","PostgreSQL","CRUD Operations","Data Modeling"]},{title:"Tools & Cloud",tags:["Vercel","Git","GitHub","VS Code","npm"]},{title:"Design",tags:["Figma","Canva","UI/UX Design","Wireframing","Prototyping"]}],$=[{id:"capstone-award",type:"award",date:"June 26, 2026",title:"Best in Capstone Project",description:'Awarded for "TricyPay — Smart Transportation Management System," contributing as Mobile & IoT Application Developer on fare automation, payments, and operational monitoring for local transport organizations.'},{id:"tb-research",type:"research",date:"June 26, 2026",title:"Special Citation for Research Publication",description:'"Agent-Based Simulation and GIS Mapping of Tuberculosis Transmission: A Case Study in Daet, Camarines Norte." Published in Zenodo.'}],w=[{name:"Cisco Networking Basics",year:"2024"},{name:"Technical Support Fundamentals — Coursera",year:"2024"},{name:"BITSCON 2024 Participant",year:"2024"},{name:"From Scroll to Skill — ICT Council",year:"2025"}];function C(n){const t=document.getElementById(n);t&&(t.innerHTML=L.map(a=>`
    <div class="exp-card reveal">
      <div class="exp-topbar">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="path">${a.path}</div>
      </div>
      <div class="exp-body">
        <div class="exp-role-row">
          <div>
            <h3>${a.role} <span class="company">— ${a.company}</span></h3>
          </div>
          <div class="exp-meta">${a.period}<br>${a.location}</div>
        </div>
        <ul class="exp-log">
          ${a.details.map(i=>`<li>${i}</li>`).join("")}
        </ul>
        <div class="exp-stack">
          ${a.stack.map(i=>`<span class="tag">${i}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join(""))}function T(n,t="all"){const a=document.getElementById(n);if(!a)return;const i=t==="all"?S:S.filter(e=>e.category===t);a.innerHTML=`
    <div class="timeline-track"><div class="fill"></div></div>
    ${i.map(e=>`
      <div class="t-item ${e.award?"award":""}" data-category="${e.category}">
        <div class="t-node"></div>
        <div class="proj-card">
          <div class="proj-top">
            <h3>${e.title}</h3>
            <span class="proj-date mono">${e.date}</span>
          </div>
          <span class="proj-role">Role: ${e.role}</span>
          <p class="desc">${e.description}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            ${e.award?`<span class="award-badge" style="margin-top: 14px;">${e.award}</span>`:""}
            ${e.demoUrl?`<a href="https://${e.demoUrl.replace(/^https?:\/\//,"")}" target="_blank" rel="noopener" class="proj-demo-btn">Live Demo ↗</a>`:""}
            ${e.publicationUrl?`<a href="${e.publicationUrl}" target="_blank" rel="noopener" class="proj-pub-btn">View Publication ↗</a>`:""}
          </div>
          ${e.images&&e.images.length>0?`
            <div class="proj-carousel">
              <button class="carousel-btn prev" aria-label="Previous image">‹</button>
              <div class="carousel-track-container">
                <ul class="carousel-track">
                  ${e.images.map((o,s)=>`
                    <li class="carousel-slide" data-index="${s}">
                      <div class="proj-img-wrap">
                        <img src="${o}" alt="${e.title} image ${s+1}" loading="lazy">
                      </div>
                    </li>
                  `).join("")}
                </ul>
              </div>
              <button class="carousel-btn next" aria-label="Next image">›</button>
              <div class="carousel-nav">
                ${e.images.map((o,s)=>`
                  <button class="carousel-indicator" data-slide-to="${s}" aria-label="Go to slide ${s+1}"></button>
                `).join("")}
              </div>
            </div>
          `:""}
          <div class="proj-tags">
            ${e.tags.map(o=>`<span class="tag">${o}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("")}
  `}function P(n){const t=document.getElementById(n);t&&(t.innerHTML=A.map(a=>`
    <div class="skill-card reveal">
      <div class="eyebrow">${a.title}</div>
      <div class="skill-tags">
        ${a.tags.map(i=>`<span class="tag">${i}</span>`).join("")}
      </div>
    </div>
  `).join(""))}function M(n){const t=document.getElementById(n);t&&(t.innerHTML=$.map(a=>`
    <div class="cred-card reveal">
      <div class="cred-eyebrow">${a.type==="award"?"Award":"Research"} · ${a.date}</div>
      <h4>${a.title}</h4>
      <p>${a.description}</p>
    </div>
  `).join(""))}function D(n){const t=document.getElementById(n);t&&(t.innerHTML=`
    <div class="label">Certificates</div>
    ${w.map(a=>`
      <span class="tag">${a.name} · ${a.year}</span>
    `).join("")}
  `)}function I(){B(),C("experienceContainer"),T("timeline","all"),E(),P("skillsContainer"),M("credentialsContainer"),D("certificatesContainer"),x(),R(),U(),O(),F(),N()}function B(){const n=document.getElementById("themeToggle"),a=localStorage.getItem("portfolio_theme")||"dark";document.documentElement.setAttribute("data-theme",a),n&&n.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",e),localStorage.setItem("portfolio_theme",e)})}function x(){const n=document.getElementById("navToggle"),t=document.getElementById("navLinks");n&&t&&(n.addEventListener("click",()=>{t.classList.toggle("open")}),t.querySelectorAll("a").forEach(a=>{a.addEventListener("click",()=>t.classList.remove("open"))}))}function R(){const n=document.querySelectorAll("section[id]"),t=document.querySelectorAll('.nav-links a[href^="#"]'),a=new IntersectionObserver(i=>{i.forEach(e=>{if(e.isIntersecting){t.forEach(s=>s.classList.remove("active"));const o=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);o&&o.classList.add("active")}})},{rootMargin:"-40% 0px -55% 0px"});n.forEach(i=>a.observe(i))}function U(){const n=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&i.target.classList.add("in")})},{threshold:.15});document.querySelectorAll(".reveal").forEach(a=>n.observe(a));const t=document.getElementById("timeline");t&&new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&t.classList.add("in")})},{threshold:.2}).observe(t)}function O(){const n=document.querySelectorAll(".filter-btn");n.forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-filter")||"all";n.forEach(e=>e.classList.remove("active")),t.classList.add("active"),T("timeline",a),E();const i=document.getElementById("timeline");i&&(i.classList.remove("in"),requestAnimationFrame(()=>{i.classList.add("in")}))})})}function F(){const n=document.getElementById("contactForm"),t=document.getElementById("formFeedback");n&&t&&n.addEventListener("submit",a=>{a.preventDefault();const i=document.getElementById("contactName"),e=document.getElementById("contactEmail"),o=document.getElementById("contactMessage");if(!(i!=null&&i.value)||!(e!=null&&e.value)||!(o!=null&&o.value)){t.className="form-feedback error",t.textContent="Please fill out all fields before sending your message.";return}t.className="form-feedback success",t.textContent=`Thank you, ${i.value}! Your message has been prepared. Opening your email client...`;const s=encodeURIComponent(`Portfolio Inquiry from ${i.value}`),m=encodeURIComponent(`Name: ${i.value}
Email: ${e.value}

Message:
${o.value}`);setTimeout(()=>{window.location.href=`mailto:krizzaheart.esperas@gmail.com?subject=${s}&body=${m}`,n.reset()},1200)})}function N(){const n=document.createElement("div");n.id="lightboxModal",n.className="lightbox-modal",n.innerHTML=`
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightboxImg" alt="Enlarged project view">
  `,document.body.appendChild(n);const t=n.querySelector("#lightboxImg");document.body.addEventListener("click",a=>{const e=a.target.closest(".proj-img-wrap");if(e){const o=e.querySelector("img");o&&(t.src=o.src,t.alt=o.alt,n.classList.add("active"))}}),n.addEventListener("click",a=>{const i=a.target;(i.id==="lightboxModal"||i.classList.contains("lightbox-close"))&&n.classList.remove("active")})}function E(){document.querySelectorAll(".proj-carousel").forEach(t=>{const a=t.querySelector(".carousel-track"),i=Array.from(t.querySelectorAll(".carousel-slide")),e=Array.from(t.querySelectorAll(".carousel-indicator")),o=t.querySelector(".carousel-btn.prev"),s=t.querySelector(".carousel-btn.next"),m=t.querySelector(".carousel-track-container");if(!a||i.length===0||!m)return;let r=0,g,f=!0;function j(){return i[0].offsetWidth+16}function l(c,d=!0){r=(c+i.length)%i.length,d?a.style.transition="transform 0.52s cubic-bezier(0.25, 1, 0.5, 1)":a.style.transition="none";const p=j(),k=m.offsetWidth/2-r*p-i[0].offsetWidth/2;a.style.transform=`translateX(${k}px)`,i.forEach((h,b)=>{h.classList.toggle("active",b===r)}),e.forEach((h,b)=>{h.classList.toggle("active",b===r)})}function v(){y(),g=window.setInterval(()=>{i.length<=1||(f?r===i.length-1?(f=!1,l(r-1)):l(r+1):r===0?(f=!0,l(r+1)):l(r-1))},2800)}function y(){g!==void 0&&(clearInterval(g),g=void 0)}function u(){y(),v()}o&&o.addEventListener("click",c=>{c.stopPropagation(),l(r-1),u()}),s&&s.addEventListener("click",c=>{c.stopPropagation(),l(r+1),u()}),e.forEach((c,d)=>{c.addEventListener("click",p=>{p.stopPropagation(),l(d),u()})}),i.forEach((c,d)=>{c.addEventListener("click",p=>{c.classList.contains("active")||(p.stopPropagation(),l(d),u())})}),t.addEventListener("mouseenter",y),t.addEventListener("mouseleave",v),l(0,!1),requestAnimationFrame(()=>l(0,!1)),v()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",I):I();
