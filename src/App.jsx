import React, { useState } from 'react';
import { 
  LayoutDashboard, MapPin, Tags, Store, Users, Bell, Search, Plus, TrendingUp,
  ArrowUpRight, Settings, LogOut, Sun, Moon, ShieldCheck, Building, Home, Heart,
  MessageCircle, Navigation, Utensils, Smartphone, Stethoscope, ShoppingBag, Star,
  X, Camera, CreditCard, DollarSign, AlertCircle, Map, UserPlus, MoreVertical,
  Briefcase, ShoppingCart, Gamepad2
} from 'lucide-react';

// --- MOCK DATA ---
const commerceData = [
  { name: 'Pizzería Roma', loc: 'Sastre', cat: 'Gastronomía', catColor: 'badge-indigo', status: 'active', icon: Utensils, rating: 4.8, reviews: 124 },
  { name: 'Tienda Mía', loc: 'San Jorge', cat: 'Indumentaria', catColor: 'badge-pink', status: 'pending', icon: ShoppingBag, rating: 4.5, reviews: 89 },
  { name: 'Farmacia Central', loc: 'Sastre', cat: 'Salud', catColor: 'badge-emerald', status: 'active', icon: Stethoscope, rating: 4.9, reviews: 256 },
  { name: 'Electrónica Express', loc: 'Crispi', cat: 'Tecnología', catColor: 'badge-cyan', status: 'active', icon: Smartphone, rating: 4.2, reviews: 45 },
  { name: 'Panadería Don Luis', loc: 'Las Rosas', cat: 'Gastronomía', catColor: 'badge-indigo', status: 'active', icon: Utensils, rating: 4.7, reviews: 112 },
  { name: 'Kiosco El Sol', loc: 'Sastre', cat: 'Varios', catColor: 'badge-amber', status: 'active', icon: Store, rating: 4.4, reviews: 67 },
];

const rubrosData = [
  { name: 'Gastronomía & Bares', businesses: 145, color: 'badge-indigo', status: 'active' },
  { name: 'Indumentaria & Calzado', businesses: 89, color: 'badge-pink', status: 'active' },
  { name: 'Salud, Farmacia & Estética', businesses: 64, color: 'badge-emerald', status: 'active' },
  { name: 'Tecnología & Celulares', businesses: 32, color: 'badge-cyan', status: 'active' },
  { name: 'Hogar, Muebles & Jardín', businesses: 45, color: 'badge-amber', status: 'active' },
  { name: 'Supermercados & Despensas', businesses: 78, color: 'badge-indigo', status: 'active' },
  { name: 'Vehículos & Talleres', businesses: 56, color: 'badge-cyan', status: 'active' },
  { name: 'Profesionales', businesses: 41, color: 'badge-emerald', status: 'active' },
  { name: 'Oficios', businesses: 29, color: 'badge-amber', status: 'active' },
  { name: 'Gimnasios & Deportes', businesses: 18, color: 'badge-pink', status: 'active' },
  { name: 'Educación & Cursos', businesses: 12, color: 'badge-indigo', status: 'active' },
  { name: 'Mascotas & Veterinarias', businesses: 24, color: 'badge-cyan', status: 'active' },
];

const categories = [
  { name: 'Gastronomía', icon: Utensils },
  { name: 'Tecnología', icon: Smartphone },
  { name: 'Salud', icon: Stethoscope },
  { name: 'Indumentaria', icon: ShoppingBag },
  { name: 'Hogar', icon: Home },
];

const globalPayments = [
  { entity: 'Sastre', manager: 'Juan Pérez', plan: 'Anual', amount: '$50.000', dueDate: '2026-12-01', status: 'active', statusLabel: 'Pagado' },
  { entity: 'San Jorge', manager: 'María Gómez', plan: 'Mensual', amount: '$5.000', dueDate: '2026-04-15', status: 'overdue', statusLabel: 'Vencido' },
  { entity: 'Las Rosas', manager: 'Carlos Ruiz', plan: 'Mensual', amount: '$5.000', dueDate: '2026-05-10', status: 'pending', statusLabel: 'Próximo' },
];

const localPayments = [
  { entity: 'Pizzería Roma', manager: 'Carlos D.', plan: 'Mensual', amount: '$1.500', dueDate: '2026-05-05', status: 'active', statusLabel: 'Pagado' },
  { entity: 'Tienda Mía', manager: 'Ana L.', plan: 'Anual', amount: '$15.000', dueDate: '2026-04-20', status: 'overdue', statusLabel: 'Vencido' },
  { entity: 'Farmacia Central', manager: 'Dr. Roberto', plan: 'Mensual', amount: '$1.500', dueDate: '2026-05-10', status: 'pending', statusLabel: 'Próximo' },
  { entity: 'Kiosco El Sol', manager: 'Luis S.', plan: 'Mensual', amount: '$1.500', dueDate: '2026-05-01', status: 'active', statusLabel: 'Pagado' },
];

const localitiesData = [
  { name: 'Sastre', province: 'Santa Fe', manager: 'Juan Pérez', email: 'juan@sastre.com', status: 'active', comercios: 45 },
  { name: 'San Jorge', province: 'Santa Fe', manager: 'María Gómez', email: 'maria@sanjorge.com', status: 'active', comercios: 120 },
  { name: 'Las Rosas', province: 'Santa Fe', manager: 'Carlos Ruiz', email: 'carlos@lasrosas.com', status: 'pending', comercios: 0 },
  { name: 'Carlos Pellegrini', province: 'Santa Fe', manager: 'Sin Asignar', email: '-', status: 'inactive', comercios: 0 },
];

const usersData = [
  { name: 'Sistema Principal', email: 'admin@dcompras.com', role: 'Super Admin', scope: 'Global', status: 'active', loc: 'Todas' },
  { name: 'Juan Pérez', email: 'juan@sastre.com', role: 'Admin Local', scope: 'Localidad', status: 'active', loc: 'Sastre' },
  { name: 'María Gómez', email: 'maria@sanjorge.com', role: 'Admin Local', scope: 'Localidad', status: 'active', loc: 'San Jorge' },
  { name: 'Carlos D.', email: 'carlos@pizzeria.com', role: 'Comercio', scope: 'Pizzería Roma', status: 'active', loc: 'Sastre' },
  { name: 'Ana L.', email: 'ana@tienda.com', role: 'Comercio', scope: 'Tienda Mía', status: 'pending', loc: 'San Jorge' },
  { name: 'Dr. Roberto', email: 'roberto@farmacia.com', role: 'Comercio', scope: 'Farmacia Central', status: 'active', loc: 'Sastre' }
];

function App() {
  const [view, setView] = useState('admin');
  const [userRole, setUserRole] = useState('superadmin');
  const [activeTab, setActiveTab] = useState('rubros'); 
  const [isDark, setIsDark] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  // Modals
  const [showLocalityModal, setShowLocalityModal] = useState(false);
  const [showRubroModal, setShowRubroModal] = useState(false);
  const [showCommerceModal, setShowCommerceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  
  const assignedLocality = 'Sastre';
  const toggleTheme = () => setIsDark(prev => !prev);

  // --- ADMIN VIEW ---
  const renderAdmin = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['superadmin', 'localadmin'] },
      { id: 'pagos', label: 'Facturación', icon: CreditCard, roles: ['superadmin', 'localadmin'] },
      { id: 'localidades', label: 'Localidades', icon: MapPin, roles: ['superadmin'] },
      { id: 'rubros', label: 'Rubros', icon: Tags, roles: ['superadmin', 'localadmin'] },
      { id: 'comercios', label: 'Comercios', icon: Store, roles: ['superadmin', 'localadmin'] },
      { id: 'usuarios', label: 'Accesos', icon: Users, roles: ['superadmin', 'localadmin'] },
    ].filter(item => item.roles.includes(userRole));

    const filteredCommerce = userRole === 'superadmin' ? commerceData.slice(0, 5) : commerceData.filter(c => c.loc === assignedLocality);

    return (
      <div className={`app-layout ${!isDark ? 'light-theme' : ''}`}>
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1 className="font-outfit"><div className="sidebar-logo-icon">D'C</div>D'Compras <span>Web</span></h1>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-section-title">{userRole === 'superadmin' ? 'Principal (Maestro)' : `Gestión Local: ${assignedLocality}`}</div>
            {navItems.map((item) => (
              <div key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                <item.icon /><span>{item.label}</span>
              </div>
            ))}
            <div className="sidebar-section-title">Sistema</div>
            <div className="nav-item"><Settings /><span>Configuración</span></div>
          </nav>
        </aside>

        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <div className="role-badge">
                {userRole === 'superadmin' ? <ShieldCheck size={14}/> : <Building size={14}/>}
                {userRole === 'superadmin' ? 'Control Total' : `Admin Local: ${assignedLocality}`}
              </div>
              <h2 className="font-outfit">
                {userRole === 'superadmin' ? 'Panel de Control Maestro' : `Panel de Gestión: ${assignedLocality}`}
              </h2>
            </div>
            <div className="header-right">
              <div className="role-switcher">
                <select value={view} onChange={(e) => setView(e.target.value)}>
                  <option value="admin">💻 Vista Admin</option>
                  <option value="public">📱 Vista Pública</option>
                </select>
              </div>
              <div className="role-switcher">
                <select value={userRole} onChange={(e) => {
                  setUserRole(e.target.value); 
                  if(e.target.value === 'localadmin' && activeTab === 'localidades') setActiveTab('dashboard');
                }}>
                  <option value="superadmin">👑 Super Admin</option>
                  <option value="localadmin">🏠 Admin Local</option>
                </select>
              </div>
              <button className="theme-toggle" onClick={toggleTheme}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
              <div className="avatar"></div>
            </div>
          </header>

          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon indigo"><Store size={22} /></div></div><div className="stat-label">Comercios {userRole === 'localadmin' ? 'Locales' : 'Globales'}</div><div className="stat-value">{filteredCommerce.length}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}><div className="stat-card-header"><div className="stat-icon emerald"><MapPin size={22} /></div></div><div className="stat-label">{userRole === 'localadmin' ? 'Estado Zona' : 'Localidades'}</div><div className="stat-value">{userRole === 'localadmin' ? 'Activo' : '12'}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}><div className="stat-card-header"><div className="stat-icon pink"><Users size={22} /></div></div><div className="stat-label">Usuarios</div><div className="stat-value">{userRole === 'localadmin' ? '412' : '5,890'}</div></div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.4s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">
                    {userRole === 'superadmin' ? 'Últimos Comercios (Global)' : `Comercios en ${assignedLocality}`}
                  </h3>
                  <button className="btn-add"><Plus size={18} /> Agregar Comercio</button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>Comercio</th>{userRole === 'superadmin' && <th>Localidad</th>}<th>Rubro</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {filteredCommerce.map((item, i) => (
                        <tr key={i}>
                          <td className="commerce-name">{item.name}</td>
                          {userRole === 'superadmin' && <td className="commerce-loc">{item.loc}</td>}
                          <td><span className={`badge ${item.catColor}`}>{item.cat}</span></td>
                          <td><div className={`status ${item.status}`}><span className={`status-dot ${item.status}`}></span>{item.status === 'active' ? 'Activo' : 'Pendiente'}</div></td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn">Editar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* TAB: RUBROS */}
          {activeTab === 'rubros' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in">
                  <div className="stat-card-header"><div className="stat-icon indigo"><Tags size={22} /></div></div>
                  <div className="stat-label">Rubros Activos</div>
                  <div className="stat-value">{rubrosData.filter(r => r.status === 'active').length}</div>
                </div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}>
                  <div className="stat-card-header"><div className="stat-icon emerald"><TrendingUp size={22} /></div></div>
                  <div className="stat-label">Rubro más Popular</div>
                  <div className="stat-value" style={{fontSize: '1.2rem', marginTop: '10px', color: isDark ? '#fff' : '#0f172a'}}>Gastronomía</div>
                </div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}>
                  <div className="stat-card-header"><div className="stat-icon pink"><Store size={22} /></div></div>
                  <div className="stat-label">Total Comercios</div>
                  <div className="stat-value">633</div>
                </div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.3s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">Gestión de Rubros y Servicios</h3>
                  <button className="btn-add" onClick={() => setShowRubroModal(true)}>
                    <Plus size={18} /> Crear Nuevo Rubro
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Nombre del Rubro</th>
                        <th>Etiqueta Visual</th>
                        <th>Comercios Asociados</th>
                        <th>Estado</th>
                        <th style={{ textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rubrosData.map((item, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, color: isDark ? '#fff' : '#0f172a' }}>{item.name}</td>
                          <td><span className={`badge ${item.color}`}>Muestra Visual</span></td>
                          <td><span style={{ color: '#94a3b8' }}>{item.businesses} comercios</span></td>
                          <td>
                            <div className={`status ${item.status === 'active' ? 'active' : 'pending'}`}>
                              <span className={`status-dot ${item.status === 'active' ? 'active' : 'pending'}`}></span>
                              {item.status === 'active' ? 'Publicado' : 'En Revisión'}
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn"><MoreVertical size={16}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL AGREGAR RUBRO */}
              {showRubroModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>Crear Nuevo Rubro</h3>
                      <div className="close-gallery" onClick={() => setShowRubroModal(false)}><X size={24}/></div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre del Rubro/Servicio</label>
                        <input type="text" placeholder="Ej: Herrería, Pintor, Veterinaria..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', display: 'block' }}>Seleccionar Color</label>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#6366f1', cursor: 'pointer', border: '2px solid transparent' }}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#10b981', cursor: 'pointer', border: '2px solid transparent' }}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#ec4899', cursor: 'pointer', border: '2px solid transparent' }}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#06b6d4', cursor: 'pointer', border: '2px solid transparent' }}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f59e0b', cursor: 'pointer', border: '2px solid transparent' }}></div>
                        </div>
                      </div>

                      <button className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem' }}>
                        Guardar Rubro
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB: COMERCIOS */}
          {activeTab === 'comercios' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon indigo"><Store size={22} /></div></div><div className="stat-label">Total Comercios</div><div className="stat-value">{filteredCommerce.length}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}><div className="stat-card-header"><div className="stat-icon emerald"><TrendingUp size={22} /></div></div><div className="stat-label">Activos / Publicados</div><div className="stat-value">{filteredCommerce.filter(c => c.status === 'active').length}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}><div className="stat-card-header"><div className="stat-icon amber"><Bell size={22} /></div></div><div className="stat-label">En Revisión</div><div className="stat-value">{filteredCommerce.filter(c => c.status === 'pending').length}</div></div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.3s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">Directorio de Comercios</h3>
                  <button className="btn-add" onClick={() => setShowCommerceModal(true)}>
                    <Plus size={18} /> Alta de Comercio
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Comercio</th>
                        <th>Rubro</th>
                        <th>Calificación</th>
                        <th>Estado</th>
                        <th style={{ textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommerce.map((item, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, color: isDark ? '#fff' : '#0f172a' }}>{item.name}</td>
                          <td><span className={`badge ${item.catColor}`}>{item.cat}</span></td>
                          <td><div className="business-rating" style={{ display: 'inline-flex' }}><Star size={14} fill="#fbbf24" />{item.rating}</div></td>
                          <td>
                            <div className={`status ${item.status}`}>
                              <span className={`status-dot ${item.status}`}></span>
                              {item.status === 'active' ? 'Publicado' : 'Revisión'}
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn">Gestionar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL ALTA COMERCIO */}
              {showCommerceModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '600px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>Alta de Nuevo Comercio</h3>
                      <div className="close-gallery" onClick={() => setShowCommerceModal(false)}><X size={24}/></div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Comercial</label>
                          <input type="text" placeholder="Ej: Pizzería Roma" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Rubro Principal</label>
                          <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none' }}>
                            <option>Gastronomía</option>
                            <option>Salud</option>
                            <option>Indumentaria</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>WhatsApp (Sin 0 ni 15)</label>
                          <input type="text" placeholder="Ej: 3406555555" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Dirección Física</label>
                          <input type="text" placeholder="Ej: San Martín 123" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                      </div>

                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '5px 0' }}></div>
                      
                      <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', margin: 0 }}>Imágenes & Galería</h4>
                      
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1, border: `2px dashed ${isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1'}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', cursor: 'pointer' }}>
                          <Camera size={28} color="#94a3b8" />
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>Foto Principal</span>
                        </div>
                        <div style={{ flex: 2, border: `2px dashed ${isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1'}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', cursor: 'pointer' }}>
                          <Plus size={28} color="#94a3b8" />
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>Agregar a la Galería (Max 6)</span>
                        </div>
                      </div>

                      <button className="action-btn primary" style={{ marginTop: '15px', padding: '16px', fontSize: '0.95rem' }}>
                        Publicar Comercio
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB: LOCALIDADES */}
          {activeTab === 'localidades' && userRole === 'superadmin' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon emerald"><Map size={22} /></div></div><div className="stat-label">Activas</div><div className="stat-value">12</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}><div className="stat-card-header"><div className="stat-icon amber"><Building size={22} /></div></div><div className="stat-label">Pendientes</div><div className="stat-value">3</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}><div className="stat-card-header"><div className="stat-icon pink"><Users size={22} /></div></div><div className="stat-label">Encargados</div><div className="stat-value">14</div></div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.3s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">Gestión de Localidades</h3>
                  <button className="btn-add" onClick={() => setShowLocalityModal(true)}><MapPin size={18} /> Agregar Localidad</button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>Localidad</th><th>Encargado</th><th>Contacto</th><th>Comercios</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {localitiesData.map((item, i) => (
                        <tr key={i}>
                          <td><div className="commerce-name">{item.name}</div><div className="commerce-loc">{item.province}</div></td>
                          <td style={{ fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e293b' }}>{item.manager}{item.manager === 'Sin Asignar' && <button style={{ marginLeft: '8px', padding: '2px 8px', background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: 'none', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>Asignar</button>}</td>
                          <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.email}</td>
                          <td><span className="badge badge-indigo">{item.comercios} adheridos</span></td>
                          <td><div className={`status ${item.status === 'active' ? 'active' : item.status === 'pending' ? 'pending' : 'overdue'}`}><span className={`status-dot ${item.status === 'active' ? 'active' : item.status === 'pending' ? 'pending' : 'overdue'}`}></span>{item.status === 'active' ? 'Operativa' : item.status === 'pending' ? 'Configurando' : 'Inactiva'}</div></td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn"><MoreVertical size={16}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL AGREGAR LOCALIDAD */}
              {showLocalityModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '500px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>Nueva Localidad</h3>
                      <div className="close-gallery" onClick={() => setShowLocalityModal(false)}><X size={24}/></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Localidad</label><input type="text" placeholder="Ej: Sastre" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Provincia</label><input type="text" placeholder="Ej: Santa Fe" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      </div>
                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '10px 0' }}></div>
                      <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={18} color="#6366f1" /> Asignar Encargado</h4>
                      <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Completo</label><input type="text" placeholder="Nombre del administrador" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Correo Electrónico</label><input type="email" placeholder="email@ejemplo.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      <button className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem' }}>Guardar y Generar Accesos</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB: PAGOS */}
          {activeTab === 'pagos' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon emerald"><DollarSign size={22} /></div></div><div className="stat-label">Ingresos del Mes</div><div className="stat-value">{userRole === 'superadmin' ? '$50.000' : '$3.000'}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}><div className="stat-card-header"><div className="stat-icon pink"><AlertCircle size={22} /></div></div><div className="stat-label">Pendiente de Cobro</div><div className="stat-value" style={{color: '#fb7185'}}>{userRole === 'superadmin' ? '$5.000' : '$15.000'}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}><div className="stat-card-header"><div className="stat-icon indigo"><CreditCard size={22} /></div></div><div className="stat-label">Suscripciones Activas</div><div className="stat-value">{userRole === 'superadmin' ? '12' : '38'}</div></div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.3s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">{userRole === 'superadmin' ? 'Control de Pagos' : 'Facturación de Comercios'}</h3>
                  <button className="btn-add"><Plus size={18} /> Registrar Pago</button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>{userRole === 'superadmin' ? 'Localidad' : 'Comercio'}</th><th>Responsable</th><th>Plan</th><th>Monto</th><th>Vencimiento</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {(userRole === 'superadmin' ? globalPayments : localPayments).map((item, i) => (
                        <tr key={i}>
                          <td className="commerce-name">{item.entity}</td>
                          <td className="commerce-loc">{item.manager}</td>
                          <td><span className="badge badge-indigo">{item.plan}</span></td>
                          <td style={{fontWeight: 600, color: isDark ? '#e2e8f0' : '#1e293b'}}>{item.amount}</td>
                          <td style={{color: '#94a3b8'}}>{item.dueDate}</td>
                          <td><div className={`status ${item.status}`}><span className={`status-dot ${item.status}`}></span>{item.statusLabel}</div></td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn">Gestionar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* TAB: USUARIOS */}
          {activeTab === 'usuarios' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon indigo"><ShieldCheck size={22} /></div></div><div className="stat-label">Admins {userRole === 'superadmin' ? 'Globales' : 'Locales'}</div><div className="stat-value">{userRole === 'superadmin' ? '3' : '1'}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.1s'}}><div className="stat-card-header"><div className="stat-icon emerald"><Store size={22} /></div></div><div className="stat-label">Cuentas Comercios</div><div className="stat-value">{userRole === 'superadmin' ? '142' : '38'}</div></div>
                <div className="stat-card animate-in" style={{animationDelay: '0.2s'}}><div className="stat-card-header"><div className="stat-icon pink"><Bell size={22} /></div></div><div className="stat-label">Permisos Extendidos</div><div className="stat-value">{userRole === 'superadmin' ? '89' : '24'}</div></div>
              </div>

              <section className="table-section animate-in" style={{animationDelay: '0.3s'}}>
                <div className="table-header">
                  <h3 className="font-outfit">Gestión de Accesos y Usuarios</h3>
                  <button className="btn-add" onClick={() => setShowUserModal(true)}>
                    <UserPlus size={18} /> Nuevo Acceso
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>Usuario</th><th>Rol</th><th>Ámbito / Negocio</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {(userRole === 'superadmin' ? usersData : usersData.filter(u => u.loc === assignedLocality && u.role === 'Comercio')).map((item, i) => (
                        <tr key={i}>
                          <td><div className="commerce-name">{item.name}</div><div className="commerce-loc">{item.email}</div></td>
                          <td><span className={`badge ${item.role === 'Super Admin' ? 'badge-pink' : item.role === 'Admin Local' ? 'badge-indigo' : 'badge-emerald'}`}>{item.role}</span></td>
                          <td style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 500 }}>{item.scope}</td>
                          <td><div className={`status ${item.status === 'active' ? 'active' : 'pending'}`}><span className={`status-dot ${item.status === 'active' ? 'active' : 'pending'}`}></span>{item.status === 'active' ? 'Activo' : 'Pendiente'}</div></td>
                          <td style={{ textAlign: 'right' }}><button className="edit-btn">Configurar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL USUARIOS */}
              {showUserModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '500px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>Otorgar Acceso</h3>
                      <div className="close-gallery" onClick={() => setShowUserModal(false)}><X size={24}/></div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Completo</label><input type="text" placeholder="Ej: Marcos Silva" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Email (Login)</label><input type="email" placeholder="email@ejemplo.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Rol del Usuario</label>
                        <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none' }}>
                          {userRole === 'superadmin' && <option value="super">Super Admin (Control Total)</option>}
                          {userRole === 'superadmin' && <option value="local">Admin Local (Por Localidad)</option>}
                          <option value="commerce">Administrador de Comercio</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Vincular a (Negocio o Localidad)</label>
                        <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none' }}>
                          {userRole === 'superadmin' ? <option>Seleccionar Entidad...</option> : commerceData.filter(c => c.loc === assignedLocality).map((c, i) => <option key={i}>{c.name}</option>)}
                        </select>
                      </div>

                      <div style={{ background: isDark ? 'rgba(99, 102, 241, 0.1)' : '#e0e7ff', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : '#c7d2fe'}` }}>
                        <div style={{ background: '#6366f1', padding: '8px', borderRadius: '8px', color: '#fff' }}><Bell size={20} /></div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: 0, fontSize: '0.9rem', color: isDark ? '#fff' : '#1e293b' }}>Permisos Extendidos</h5>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#475569' }}>Permitir cambiar fotos, crear promociones y notificaciones push a la App Pública.</p>
                        </div>
                        <div style={{ width: '40px', height: '22px', background: '#6366f1', borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
                          <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                        </div>
                      </div>

                      <button className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem' }}>
                        Enviar Credenciales de Acceso
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <footer className="footer"><p className="footer-main">D'Compras © 2026</p><p className="footer-powered">Powered By <span>Digimedios Apps</span></p></footer>
        </main>
      </div>
    );
  };

  // --- PUBLIC VIEW ---
  if (view === 'public') {
      return (
      <div className={`public-layout ${!isDark ? 'light-theme' : ''}`}>
        <header className="public-header">
          <div className="locality-selector"><MapPin size={16} /><span>{assignedLocality}, SF</span></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="theme-toggle" onClick={toggleTheme} style={{ background: 'transparent', border: 'none' }}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
            <select value={view} onChange={(e) => setView(e.target.value)} style={{ background: 'rgba(255,255,255,0.1)', color: isDark ? '#fff' : '#000', border: 'none', borderRadius: '10px', padding: '5px' }}>
              <option value="public">📱 Vista Pública</option>
              <option value="admin">💻 Vista Admin</option>
            </select>
          </div>
        </header>

        <section className="public-hero">
          <h2 className="font-outfit">Lo mejor de <br /> <b>{assignedLocality}</b> en un solo lugar.</h2>
          <div className="public-search"><Search /><input type="text" placeholder="Buscar..." /></div>
        </section>

        <div className="category-scroll">
          {categories.map((cat, i) => (
            <div key={i} className="category-item"><div className="category-icon"><cat.icon size={24} /></div><span>{cat.name}</span></div>
          ))}
        </div>

        <div className="section-title"><h3 className="font-outfit">Comercios destacados</h3></div>

        <div className="business-feed">
          {commerceData.filter(c => c.loc === assignedLocality).map((biz, i) => (
            <div key={i} className="business-card-public animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="business-image" onClick={() => setSelectedBusiness(biz)}>
                <div className="business-badge-status">Abierto</div>
                <div style={{ position: 'absolute', bottom: '10px', left: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}><Camera size={16} /><span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Ver Galería</span></div>
              </div>
              <div className="business-info-public">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}><h4 className="font-outfit" style={{ margin: 0 }}>{biz.name}</h4><div className="business-rating"><Star size={14} fill="#fbbf24" />{biz.rating}</div></div>
                <div className="business-meta"><span>{biz.cat}</span><span>•</span><span>{biz.reviews} reseñas</span></div>
                <div className="business-actions">
                  <button className="action-btn primary"><MessageCircle size={18} /> WhatsApp</button>
                  <button className="action-btn"><Navigation size={18} /> Mapa</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedBusiness && (
          <div className="gallery-modal">
            <div className="gallery-header">
              <h3 className="font-outfit">{selectedBusiness.name}</h3>
              <div className="close-gallery" onClick={() => setSelectedBusiness(null)}><X size={24} /></div>
            </div>
            <div className="photo-grid">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="photo-item"><div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', color: '#475569' }}><Camera size={32} opacity={0.3} /></div></div>
              ))}
            </div>
            <button className="action-btn primary" style={{ width: '100%' }}>Contactar Ahora</button>
          </div>
        )}

        <nav className="bottom-nav">
          <div className="nav-tab active"><Home size={24} /><span>Inicio</span></div>
          <div className="nav-tab"><Tags size={24} /><span>Rubros</span></div>
          <div className="nav-tab"><Heart size={24} /><span>Favoritos</span></div>
          <div className="nav-tab"><Users size={24} /><span>Perfil</span></div>
        </nav>
      </div>
      );
  }

  return renderAdmin();
}

export default App;
