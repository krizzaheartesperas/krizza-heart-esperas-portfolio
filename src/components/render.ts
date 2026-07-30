import {
  EXPERIENCES,
  PROJECTS,
  SKILL_GROUPS,
  CREDENTIALS,
  CERTIFICATES
} from '../data/portfolioData';
import { ProjectCategory } from '../types';

export function renderExperience(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = EXPERIENCES.map(exp => `
    <div class="exp-card reveal">
      <div class="exp-topbar">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="path">${exp.path}</div>
      </div>
      <div class="exp-body">
        <div class="exp-role-row">
          <div>
            <h3>${exp.role} <span class="company">— ${exp.companyUrl ? `<a href="${exp.companyUrl}" target="_blank" rel="noopener noreferrer" class="company-link">${exp.company}</a>` : exp.company}</span></h3>
          </div>
          <div class="exp-meta">${exp.period}<br>${exp.location}</div>
        </div>
        <ul class="exp-log">
          ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <div class="exp-stack">
          ${exp.stack.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

export function renderProjects(containerId: string, filterCategory: ProjectCategory = 'all'): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  container.innerHTML = `
    <div class="timeline-track"><div class="fill"></div></div>
    ${filteredProjects.map(proj => `
      <div class="t-item ${proj.award ? 'award' : ''}" data-category="${proj.category}">
        <div class="t-node"></div>
        <div class="proj-card">
          <div class="proj-top">
            <h3>${proj.title}</h3>
            <span class="proj-date mono">${proj.date}</span>
          </div>
          <span class="proj-role">Role: ${proj.role}</span>
          <p class="desc">${proj.description.length > 140 ? proj.description.substring(0, 140) + '...' : proj.description}</p>
          <div class="proj-card-actions">
            <button class="btn btn-primary view-details-btn" data-project-id="${proj.id}">View Details →</button>
            ${proj.award ? `<span class="award-badge">${proj.award}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('')}
  `;
}

const SKILL_ICONS: Record<string, string> = {
  // Languages
  'JavaScript': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>`,
  'TypeScript': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`,
  'Python': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>`,
  'HTML5': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>`,
  'CSS3': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>`,
  // Frontend
  'Responsive Design': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><rect x="14" y="8" width="6" height="8" rx="1"/></svg>`,
  'Vite': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.608 4.52 3.433 18.28 12 24l8.567-5.72 1.825-13.76zm-2.451 18.013l-3.4-5.668 1.713-.974 1.688 2.81 3.654-6.083 1.713.974z"/></svg>`,
  'DOM API': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  // Backend
  'Node.js': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/></svg>`,
  'REST APIs': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  'Authentication': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  'Serverless': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  // Database
  'Supabase': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.285 12.63.712 13.5 1.46 13.5h9.96l.48 9.46c.016.987 1.26 1.408 1.874.638l9.262-11.653c.48-.578.052-1.448-.697-1.448H12.38l-.48-9.46z"/></svg>`,
  'PostgreSQL': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403 11.34 11.34 0 0 0-.534.16C13.529.634 13.21.684 12.824.848c-.378.162-.532.26-.868.392a10.75 10.75 0 0 0-.742.343 10.37 10.37 0 0 0-1.553 1.09c-.265.222-.432.413-.618.611a10.6 10.6 0 0 0-.972 1.284 11.24 11.24 0 0 0-.607 1.13 10.56 10.56 0 0 0-.54 1.665 10.7 10.7 0 0 0-.166 1.86c0 .383.023.727.065 1.074.113.946.373 1.798.74 2.527.165.33.353.64.559.93.206.29.43.558.672.806.242.247.503.475.782.684.279.208.576.396.89.563.315.166.646.31.993.432.348.12.712.218 1.09.291.378.073.773.12 1.178.139.405.018.821.016 1.24-.008.42-.024.842-.072 1.258-.142.416-.07.826-.16 1.226-.268.4-.108.793-.234 1.172-.376.38-.141.747-.299 1.1-.47.353-.172.692-.358 1.015-.555.323-.197.632-.405.924-.622.292-.217.567-.443.825-.676.258-.233.498-.472.72-.715l.027-.031c.222-.245.43-.5.621-.76.191-.262.366-.529.523-.8.157-.27.297-.545.42-.822.123-.277.23-.558.318-.84.088-.283.159-.567.211-.852.052-.285.085-.571.099-.856.014-.285.008-.57-.017-.853a11.24 11.24 0 0 0-.148-.862 10.56 10.56 0 0 0-.32-.882 10.69 10.69 0 0 0-.512-.944 10.9 10.9 0 0 0-.72-.998 10.9 10.9 0 0 0-.943-.963 10.72 10.72 0 0 0-1.16-.847 10.62 10.62 0 0 0-1.294-.616z"/></svg>`,
  'CRUD Operations': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  'Data Modeling': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="9" y="14" width="7" height="7"/><path d="M5.5 10v4h13V10"/><path d="M12 14v-4"/></svg>`,
  // Tools
  'Vercel': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>`,
  'Git': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.606-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>`,
  'GitHub': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  'VS Code': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.08V4.92a1.5 1.5 0 0 0-.85-1.333zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`,
  'npm': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>`,
  // Design
  'Figma': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.587-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm4.587 7.509h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49v-4.49h-.098zm1.471 4.49c0 1.665 1.355 3.019 3.019 3.019s3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019h-3.019v3.019z"/></svg>`,
  'Canva': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.72 6.35c.78 0 1.41.63 1.41 1.41s-.63 1.41-1.41 1.41-1.41-.63-1.41-1.41.63-1.41 1.41-1.41zm-7.44 5.91c0-2.17 1.76-3.93 3.93-3.93.98 0 1.88.36 2.57.95l-1.08 1.3c-.4-.33-.91-.53-1.49-.53-1.27 0-2.31 1.04-2.31 2.31s1.04 2.31 2.31 2.31c.64 0 1.22-.27 1.64-.69l1.08 1.3c-.69.64-1.6 1.03-2.6 1.03-2.17-.01-3.93-1.77-3.93-3.94l-.12-.11z"/></svg>`,
  'UI/UX Design': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>`,
  'Wireframing': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  'Prototyping': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
};

const CATEGORY_ICONS: Record<string, string> = {
  'Languages': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'Frontend': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  'Backend': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  'Database': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  'Tools & Cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  'Design': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
};

export function renderSkills(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SKILL_GROUPS.map(group => `
    <div class="skill-card reveal">
      <div class="skill-card-header">
        <span class="skill-cat-icon">${CATEGORY_ICONS[group.title] ?? ''}</span>
        <span class="skill-cat-title">${group.title}</span>
      </div>
      <div class="skill-tags">
        ${group.tags.map(tag => `
          <span class="skill-badge">
            <span class="skill-badge-icon">${SKILL_ICONS[tag] ?? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`}</span>
            <span class="skill-badge-label">${tag}</span>
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

export function renderCredentials(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = CREDENTIALS.map(cred => `
    <div class="cred-card reveal">
      <div class="cred-eyebrow">${cred.type === 'award' ? 'Award' : 'Research'} · ${cred.date}</div>
      <h4>${cred.title}</h4>
      <p>${cred.description}</p>
    </div>
  `).join('');
}

export function renderCertificates(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = CERTIFICATES.map(cert => `
    <div class="cert-card reveal">
      <div class="cert-img-wrap">
        <img src="${cert.image}" alt="${cert.name}" loading="lazy">
        <div class="cert-overlay">
          <span class="cert-zoom-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </span>
        </div>
      </div>
      <div class="cert-info">
        <div class="cert-year-badge">${cert.year}</div>
        <h4 class="cert-name">${cert.name}</h4>
        <p class="cert-issuer">${cert.issuer}</p>
      </div>
    </div>
  `).join('');
}

export function renderProjectModal(projectId: string): string {
  const proj = PROJECTS.find(p => p.id === projectId);
  if (!proj) return '';

  const hasImages = (proj.screenshotImages && proj.screenshotImages.length > 0) || (proj.documentationImages && proj.documentationImages.length > 0);
  const hasScreenshots = proj.screenshotImages && proj.screenshotImages.length > 0;
  const hasDocs = proj.documentationImages && proj.documentationImages.length > 0;

  const screenshotSlides = hasScreenshots
    ? proj.screenshotImages!.map((img, idx) => `
      <li class="carousel-slide" data-index="${idx}">
        <div class="proj-img-wrap"><img src="${img}" alt="${proj.title} screenshot ${idx + 1}" loading="lazy"></div>
      </li>`).join('')
    : '';

  const screenshotDots = hasScreenshots
    ? proj.screenshotImages!.map((_, idx) => `<button class="carousel-indicator" data-slide-to="${idx}" aria-label="Go to slide ${idx + 1}"></button>`).join('')
    : '';

  const docSlides = hasDocs
    ? proj.documentationImages!.map((img, idx) => `
      <li class="carousel-slide" data-index="${idx}">
        <div class="proj-img-wrap"><img src="${img}" alt="${proj.title} documentation ${idx + 1}" loading="lazy"></div>
      </li>`).join('')
    : '';

  const docDots = hasDocs
    ? proj.documentationImages!.map((_, idx) => `<button class="carousel-indicator" data-slide-to="${idx}" aria-label="Go to slide ${idx + 1}"></button>`).join('')
    : '';

  const primaryMediaLabel = proj.id === 'tricypay' || proj.id === 'egg-sorting' || proj.id === 'smart-airport'
    ? 'Documentation'
    : 'System Preview';
  const screenshotTab = hasScreenshots ? `<button class="folder-tab active" data-target="screenshots-modal-${proj.id}">${primaryMediaLabel}</button>` : '';
  const docTab = hasDocs ? `<button class="folder-tab ${!hasScreenshots ? 'active' : ''}" data-target="documentation-modal-${proj.id}">Documentation</button>` : '';

  const screenshotPane = hasScreenshots ? `
    <div class="proj-carousel tab-pane active" id="screenshots-modal-${proj.id}">
      <div class="carousel-track-container">
        <ul class="carousel-track">${screenshotSlides}</ul>
      </div>
      ${proj.screenshotImages!.length > 1 ? `
      <button class="carousel-btn prev" aria-label="Previous image">&#8249;</button>
      <button class="carousel-btn next" aria-label="Next image">&#8250;</button>
      <div class="carousel-nav">${screenshotDots}</div>
      <p class="carousel-swipe-hint mono">Swipe to browse</p>` : ''}
    </div>` : '';

  const docPane = hasDocs ? `
    <div class="proj-carousel tab-pane ${!hasScreenshots ? 'active' : ''}" id="documentation-modal-${proj.id}">
      <div class="carousel-track-container">
        <ul class="carousel-track">${docSlides}</ul>
      </div>
      ${proj.documentationImages!.length > 1 ? `
      <button class="carousel-btn prev" aria-label="Previous image">&#8249;</button>
      <button class="carousel-btn next" aria-label="Next image">&#8250;</button>
      <div class="carousel-nav">${docDots}</div>
      <p class="carousel-swipe-hint mono">Swipe to browse</p>` : ''}
    </div>` : '';

  const mediaSection = hasImages ? `
    <div class="pv-media-section">
      <div class="proj-media-container" style="margin-top: 0;">
        <div class="folder-tabs">${screenshotTab}${docTab}</div>
        <div class="folder-content">${screenshotPane}${docPane}</div>
      </div>
    </div>` : '';

  const linksHtml = [
    proj.demoUrl ? `<a href="https://${proj.demoUrl.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener" class="btn btn-primary">Live Demo &#8599;</a>` : '',
    proj.publicationUrl ? `<a href="${proj.publicationUrl}" target="_blank" rel="noopener" class="btn btn-ghost">View Publication &#8599;</a>` : ''
  ].filter(Boolean).join('');

  const awardHtml = proj.award ? `<span class="award-badge">${proj.award}</span>` : '';
  const tagsHtml = proj.tags.map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <div class="pv-header">
      <button class="pv-back-btn" id="pvBackBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Projects
      </button>
      <div class="pv-header-meta mono">${proj.date}</div>
    </div>

    <div class="pv-hero">
      <div class="pv-hero-inner">
        <div class="pv-eyebrow mono">Project Detail</div>
        <h1 class="pv-title">${proj.title}</h1>
        <div class="pv-meta">
          <span class="pv-role-badge">Role: ${proj.role}</span>
          ${awardHtml}
        </div>
        ${linksHtml ? `<div class="pv-links">${linksHtml}</div>` : ''}
      </div>
    </div>

    <div class="pv-body">
      <div class="pv-about-section">
        <h2 class="pv-section-title">About this project</h2>
        <p class="pv-desc">${proj.description}</p>
        <div class="pv-tags">${tagsHtml}</div>
      </div>
      ${mediaSection}
    </div>
  `;
}
