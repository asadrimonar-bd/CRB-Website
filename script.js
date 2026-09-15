// Cattle Reproduction Bangladesh — shared behavior + sitewide SEO

const CRB_SITE = 'https://asadrimonar-bd.github.io/CRB-Website/';
const CRB_SEO = {
  'index.html': {
    title: 'Cattle Reproduction Bangladesh | Bovine Fertility & Reproductive Health',
    description: 'Cattle Reproduction Bangladesh (CRB) advances bovine reproductive health, fertility management, artificial insemination, research and professional education in Bangladesh.',
    type: 'WebSite'
  },
  'about.html': {
    title: 'About CRB | Cattle Reproduction Bangladesh',
    description: 'Learn about Cattle Reproduction Bangladesh (CRB), its vision, mission and commitment to evidence-based bovine reproductive health and fertility management.',
    type: 'AboutPage'
  },
  'services.html': {
    title: 'Cattle Reproduction Services in Bangladesh | CRB',
    description: 'Explore CRB services for bovine reproductive health, artificial insemination, fertility management, pregnancy diagnosis, reproductive consultation and herd performance.',
    type: 'WebPage'
  },
  'research.html': {
    title: 'Cattle Reproduction Research in Bangladesh | CRB',
    description: 'Evidence-based research on repeat breeding, bovine fertility, artificial insemination, bull fertility, semen quality and reproductive health in Bangladesh.',
    type: 'WebPage'
  },
  'training.html': {
    title: 'Cattle Reproduction & AI Training in Bangladesh | CRB',
    description: 'Professional training resources from CRB covering cattle reproduction, heat detection, artificial insemination, pregnancy diagnosis and reproductive herd management.',
    type: 'WebPage'
  },
  'support.html': {
    title: 'Cattle Reproduction Support & Resources | CRB',
    description: 'Practical support and educational resources for veterinarians, AI technicians, researchers and cattle farmers working to improve reproductive performance.',
    type: 'WebPage'
  },
  'contact.html': {
    title: 'Contact Cattle Reproduction Bangladesh | CRB',
    description: 'Contact Cattle Reproduction Bangladesh (CRB) for collaboration, cattle reproduction research, training, fertility management and professional support.',
    type: 'ContactPage'
  }
};

function addMeta(name, content, attribute = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function addLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function addStructuredData(page, canonical) {
  const old = document.getElementById('crb-structured-data');
  if (old) old.remove();
  const data = {
    '@context': 'https://schema.org',
    '@type': page.type || 'WebPage',
    name: page.title,
    url: canonical,
    description: page.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${CRB_SITE}#website`,
      name: 'Cattle Reproduction Bangladesh',
      url: CRB_SITE
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cattle Reproduction Bangladesh',
      url: CRB_SITE
    },
    inLanguage: 'en'
  };
  if (page.type === 'WebSite') {
    data.potentialAction = {
      '@type': 'SearchAction',
      target: `${CRB_SITE}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    };
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'crb-structured-data';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  // Sitewide SEO metadata. Research page already has static metadata; these values keep every page consistent.
  const file = window.location.pathname.split('/').pop() || 'index.html';
  const page = CRB_SEO[file] || CRB_SEO['index.html'];
  const canonical = `${CRB_SITE}${file === 'index.html' ? '' : file}`;
  document.title = page.title;
  addMeta('description', page.description);
  addMeta('robots', 'index, follow, max-image-preview:large');
  addMeta('og:title', page.title, 'property');
  addMeta('og:description', page.description, 'property');
  addMeta('og:type', 'website', 'property');
  addMeta('og:url', canonical, 'property');
  addMeta('og:site_name', 'Cattle Reproduction Bangladesh', 'property');
  addMeta('twitter:card', 'summary');
  addMeta('twitter:title', page.title);
  addMeta('twitter:description', page.description);
  addLink('canonical', canonical);
  addStructuredData(page, canonical);

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
