/**
 * API.JS — C-SERVICE BUSINESS ULTRA STUDIO
 * Gestion des données (localStorage + API externe optionnelle)
 */

'use strict';

const API = (() => {

  /* ============ USER AUTH ============ */

  const Auth = {
    STORAGE_KEY: 'csb_user',
    USERS_KEY: 'csb_users',

    getUsers() {
      return storage.get(this.USERS_KEY, []);
    },

    saveUser(user) {
      const users = this.getUsers();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx >= 0) users[idx] = user;
      else users.push(user);
      storage.set(this.USERS_KEY, users);
    },

    getCurrentUser() {
      return storage.get(this.STORAGE_KEY, null);
    },

    register(name, email, password) {
      const users = this.getUsers();
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'Cet email est déjà utilisé.' };
      }
      const user = {
        id: generateId(),
        name,
        email,
        password, // NOTE: En production, toujours hasher les mots de passe !
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d4ff&color=050a14&bold=true`,
        joinedAt: new Date().toISOString(),
        role: 'user'
      };
      this.saveUser(user);
      this.login(email, password);
      return { success: true, user };
    },

    login(email, password) {
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { success: false, error: 'Email ou mot de passe incorrect.' };
      storage.set(this.STORAGE_KEY, user);
      return { success: true, user };
    },

    logout() {
      storage.remove(this.STORAGE_KEY);
    },

    updateProfile(updates) {
      const current = this.getCurrentUser();
      if (!current) return { success: false, error: 'Non connecté.' };
      const updated = { ...current, ...updates };
      storage.set(this.STORAGE_KEY, updated);
      this.saveUser(updated);
      return { success: true, user: updated };
    }
  };

  /* ============ NEWS / ACTUALITES ============ */

  const News = {
    STORAGE_KEY: 'csb_news',

    getAll() {
      return storage.get(this.STORAGE_KEY, this._defaults());
    },

    _defaults() {
      return [
        {
          id: generateId(),
          title: 'Nouveau studio à Kinshasa',
          description: 'C-SERVICE BUSINESS ouvre son nouveau studio ultra moderne au cœur de Kinshasa, équipé des dernières technologies cinématographiques.',
          image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
          date: new Date().toISOString(),
          category: 'Studio'
        },
        {
          id: generateId(),
          title: 'Formation Montage Vidéo — Inscriptions ouvertes',
          description: 'Notre nouvelle formation en montage vidéo professionnel est disponible. Places limitées. Inscrivez-vous dès maintenant.',
          image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400',
          date: new Date(Date.now() - 86400000 * 3).toISOString(),
          category: 'Académie'
        },
        {
          id: generateId(),
          title: 'Clip musical — Nouveau projet terminé',
          description: 'Notre équipe vient de finaliser un clip musical pour un artiste de renom. Qualité cinématographique 4K HDR.',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
          date: new Date(Date.now() - 86400000 * 7).toISOString(),
          category: 'Réalisation'
        }
      ];
    },

    add(news) {
      const all = this.getAll();
      const item = {
        id: generateId(),
        ...news,
        date: new Date().toISOString()
      };
      all.unshift(item);
      storage.set(this.STORAGE_KEY, all);
      return item;
    },

    update(id, updates) {
      const all = this.getAll();
      const idx = all.findIndex(n => n.id === id);
      if (idx < 0) return null;
      all[idx] = { ...all[idx], ...updates };
      storage.set(this.STORAGE_KEY, all);
      return all[idx];
    },

    delete(id) {
      const all = this.getAll().filter(n => n.id !== id);
      storage.set(this.STORAGE_KEY, all);
    }
  };

  /* ============ BUSINESS LISTINGS ============ */

  const Business = {
    STORAGE_KEY: 'csb_business',

    getAll() {
      return storage.get(this.STORAGE_KEY, this._defaults());
    },

    _defaults() {
      return [
        {
          id: generateId(),
          title: 'Montage vidéo professionnel',
          price: '50$',
          description: 'Montage complet de votre vidéo avec effets, transitions et musique professionnelle.',
          category: 'Montage',
          whatsapp: '+243850406200',
          image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'
        },
        {
          id: generateId(),
          title: 'Tournage cinéma — Pack complet',
          price: '200$',
          description: 'Tournage professionnel avec équipement 4K, éclairage et son. Idéal pour clips et publicités.',
          category: 'Tournage',
          whatsapp: '+243850406200',
          image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400'
        },
        {
          id: generateId(),
          title: 'Photographie événementielle',
          price: '80$',
          description: 'Couverture photo complète de vos événements : mariages, conférences, lancements de produits.',
          category: 'Photo',
          whatsapp: '+243850406200',
          image: 'https://images.unsplash.com/photo-1537633468092-8fab0d028d9c?w=400'
        }
      ];
    },

    add(listing) {
      const all = this.getAll();
      const item = { id: generateId(), ...listing, createdAt: new Date().toISOString() };
      all.unshift(item);
      storage.set(this.STORAGE_KEY, all);
      return item;
    },

    delete(id) {
      const all = this.getAll().filter(b => b.id !== id);
      storage.set(this.STORAGE_KEY, all);
    }
  };

  /* ============ CONTACT FORM ============ */

  const Contact = {
    STORAGE_KEY: 'csb_messages',

    submit(formData) {
      const messages = storage.get(this.STORAGE_KEY, []);
      const msg = {
        id: generateId(),
        ...formData,
        sentAt: new Date().toISOString(),
        read: false
      };
      messages.unshift(msg);
      storage.set(this.STORAGE_KEY, messages);
      return { success: true, message: msg };
    },

    getAll() {
      return storage.get(this.STORAGE_KEY, []);
    }
  };

  /* ============ LANGUAGE ============ */

  const Language = {
    STORAGE_KEY: 'csb_language',
    current: 'fr',

    get() {
      return storage.get(this.STORAGE_KEY, 'fr');
    },

    set(lang) {
      this.current = lang;
      storage.set(this.STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  /* ============ THEME ============ */

  const Theme = {
    STORAGE_KEY: 'csb_theme',

    get() {
      return storage.get(this.STORAGE_KEY, 'dark');
    },

    set(theme) {
      storage.set(this.STORAGE_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    },

    toggle() {
      const current = this.get();
      const next = current === 'dark' ? 'light' : 'dark';
      this.set(next);
      return next;
    }
  };

  /* ============ VISITOR COUNTER ============ */

  const Visitors = {
    STORAGE_KEY: 'csb_visits',

    increment() {
      const count = (storage.get(this.STORAGE_KEY, 0)) + 1;
      storage.set(this.STORAGE_KEY, count);
      return count;
    },

    get() {
      return storage.get(this.STORAGE_KEY, 0);
    }
  };

  /* ============ CHATBOT AI ============ */

  const Chatbot = {
    responses: {
      'bonjour': 'Bonjour ! Bienvenue chez C-SERVICE BUSINESS — ULTRA STUDIO. Comment puis-je vous aider ?',
      'hello': 'Hello! Welcome to C-SERVICE BUSINESS — ULTRA STUDIO. How can I help you?',
      'services': 'Nous offrons : montage vidéo, production cinéma, clips musicaux, photographie, streaming live, motion design, drone et bien plus !',
      'prix': 'Nos tarifs varient selon le projet. Contactez-nous sur WhatsApp (+243 850406200) pour un devis personnalisé.',
      'contact': 'WhatsApp : +243 850406200 | Email : Cianney029@gmail.com',
      'formation': 'Nous proposons des formations en montage vidéo, tournage, motion design, business digital et marketing. Visitez la section Académie !',
      'académie': 'Notre académie propose des cours professionnels en ligne et en présentiel. Tarifs accessibles !',
      'whatsapp': 'Cliquez ici pour nous contacter : https://wa.me/243850406200',
      'default': 'Je suis désolé, je n\'ai pas compris. Pouvez-vous reformuler ? Vous pouvez aussi nous contacter directement sur WhatsApp : +243 850406200'
    },

    getResponse(message) {
      const lower = message.toLowerCase().trim();
      for (const [key, response] of Object.entries(this.responses)) {
        if (lower.includes(key) && key !== 'default') return response;
      }
      return this.responses.default;
    }
  };

  return { Auth, News, Business, Contact, Language, Theme, Visitors, Chatbot };
})();
