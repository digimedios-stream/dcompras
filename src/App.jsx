import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  LayoutDashboard, MapPin, Tags, Store, Users, Bell, Search, Plus, TrendingUp,
  ArrowUpRight, Settings, LogOut, Sun, Moon, ShieldCheck, Building, Home, Heart,
  MessageCircle, Navigation, Utensils, Smartphone, Stethoscope, ShoppingBag, Star,
  X, Camera, CreditCard, DollarSign, AlertCircle, Map, UserPlus, MoreVertical,
  Briefcase, ShoppingCart, Gamepad2, Headset, ShieldAlert,
  Globe, Link as LinkIcon
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
  const [view, setView] = useState('loading');
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublicRubroId, setSelectedPublicRubroId] = useState(null);

  // Estados de Auth
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [assignedLocalityId, setAssignedLocalityId] = useState(null);

  // Datos reales de Supabase
  const [localities, setLocalities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para nueva localidad
  const [editingLocalityId, setEditingLocalityId] = useState(null);
  const [newLocName, setNewLocName] = useState('');
  const [newLocProv, setNewLocProv] = useState('');
  const [newLocStatus, setNewLocStatus] = useState('active');
  const [newLocWeatherLink, setNewLocWeatherLink] = useState('');
  const [newLocSatelliteLink, setNewLocSatelliteLink] = useState('');
  const [newLocPharmaciesLink, setNewLocPharmaciesLink] = useState('');
  const [newLocWhatsapp, setNewLocWhatsapp] = useState('');
  const [newLocAdminWhatsapp, setNewLocAdminWhatsapp] = useState('');
  const [newLocCommission, setNewLocCommission] = useState(20);
  const [locWeatherType, setLocWeatherType] = useState('url');
  const [locSatelliteType, setLocSatelliteType] = useState('url');
  const [locPharmaciesType, setLocPharmaciesType] = useState('url');
  const [isSavingLoc, setIsSavingLoc] = useState(false);

  // Estados para Rubros
  const [rubros, setRubros] = useState([]);
  const [isLoadingRubros, setIsLoadingRubros] = useState(false);
  const [newRubroName, setNewRubroName] = useState('');
  const [newRubroColor, setNewRubroColor] = useState('badge-indigo');
  const [editingRubroId, setEditingRubroId] = useState(null);
  const [isSavingRubro, setIsSavingRubro] = useState(false);

  // Estados para Comercios
  const [comercios, setComercios] = useState([]);
  const [isLoadingComercios, setIsLoadingComercios] = useState(false);
  const [isSavingCommerce, setIsSavingCommerce] = useState(false);
  const [newComName, setNewComName] = useState('');
  const [newComLocalityId, setNewComLocalityId] = useState('');
  const [newComRubroId, setNewComRubroId] = useState('');
  const [newComWhatsapp, setNewComWhatsapp] = useState('');
  const [newComAddress, setNewComAddress] = useState('');
  const [newComMapsUrl, setNewComMapsUrl] = useState('');
  const [newComMainImageFile, setNewComMainImageFile] = useState(null);
  const [newComMainImagePreview, setNewComMainImagePreview] = useState(null);
  const [editingCommerceId, setEditingCommerceId] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [newComHours, setNewComHours] = useState({
    mon: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
    tue: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
    wed: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
    thu: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
    fri: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
    sat: { open: '08:00', close: '13:00', open2: '', close2: '', active: true },
    sun: { open: '', close: '', open2: '', close2: '', active: false },
  });
  const [newComDescription, setNewComDescription] = useState('');
  const [newComInstagram, setNewComInstagram] = useState('');
  const [newComFacebook, setNewComFacebook] = useState('');

  // Estados para Facturación
  const [planes, setPlanes] = useState([]);
  const [pagosHistorial, setPagosHistorial] = useState([]);
  const [isLoadingPagos, setIsLoadingPagos] = useState(false);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [newPagoCommerceId, setNewPagoCommerceId] = useState('');
  const [newPagoPlanId, setNewPagoPlanId] = useState('');
  const [isSavingPago, setIsSavingPago] = useState(false);
  const [preciosPlanes, setPreciosPlanes] = useState([]); // Nueva tabla de precios por ciudad
  const [isLoadingPlanes, setIsLoadingPlanes] = useState(false);

  // Estados específicos para Franquicias
  const [pagosFranquicias, setPagosFranquicias] = useState(() => {
    const stored = localStorage.getItem('dcompras_pagos_franquicias');
    return stored ? JSON.parse(stored) : [
      { id: '1', locality_name: 'Sastre', concept: 'Canon de Franquicia Mensual', amount: 45000, date: '2026-04-20' },
      { id: '2', locality_name: 'San Jorge', concept: 'Comisión Regalías 15%', amount: 32000, date: '2026-04-15' }
    ];
  });
  const [paymentTypeChoice, setPaymentTypeChoice] = useState('comercio'); // comercio, franquicia
  const [newPagoLocalityId, setNewPagoLocalityId] = useState('');
  const [newPagoFranchiseConcept, setNewPagoFranchiseConcept] = useState('');
  const [newPagoFranchiseAmount, setNewPagoFranchiseAmount] = useState('');
  const [activePagosSubTab, setActivePagosSubTab] = useState('comercios'); // comercios, franquicias

  useEffect(() => {
    localStorage.setItem('dcompras_pagos_franquicias', JSON.stringify(pagosFranquicias));
  }, [pagosFranquicias]);

  const [planesError, setPlanesError] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editingPriceLocality, setEditingPriceLocality] = useState(null);
  const [tempPrices, setTempPrices] = useState({}); // {planId: price}
  const [isSavingPrices, setIsSavingPrices] = useState(false);

  // Estado In-App Viewer
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerTitle, setViewerTitle] = useState('');

  useEffect(() => {
    // Escuchar la sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkUserProfile(session.user.id);
      else { setView('login'); setAuthLoading(false); }
    });

    // Escuchar cambios de autenticación
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkUserProfile(session.user.id);
      else {
        setUserRole(null);
        setView('login');
        setAuthLoading(false);
      }
    });

    fetchLocalities();
    fetchRubros();
    fetchComercios();
    fetchPlanes();
    fetchPagos();
    fetchPreciosPlanes();
  }, []);

  const handleEditPrices = (loc) => {
    fetchPlanes(); // Re-asegurar carga
    setEditingPriceLocality(loc);
    const locPrices = {};
    preciosPlanes.filter(pp => pp.locality_id === loc.id).forEach(pp => {
      locPrices[pp.plan_id] = pp.price;
    });
    setTempPrices(locPrices);
    setShowPriceModal(true);
  };

  const handleSavePrices = async () => {
    setIsSavingPrices(true);
    try {
      for (const planId in tempPrices) {
        const { error } = await supabase
          .from('precios_planes')
          .upsert({
            locality_id: editingPriceLocality.id,
            plan_id: planId,
            price: parseFloat(tempPrices[planId])
          }, { onConflict: 'locality_id,plan_id' });

        if (error) throw error;
      }
      setShowPriceModal(false);
      fetchPreciosPlanes();
    } catch (err) {
      alert('Error guardando precios: ' + err.message);
    } finally {
      setIsSavingPrices(false);
    }
  };

  const checkUserProfile = async (userId) => {
    // Usamos maybeSingle() para que no de error 406 si el perfil no existe aún
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();

    if (data) {
      setUserRole(data.role || 'admin');
      setAssignedLocalityId(data.locality_id);
    } else {
      // Si no hay datos (o hay error), asumimos superadmin como fallback
      setUserRole('superadmin');
    }
    setView('admin');
    setAuthLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchComercios = async () => {
    setIsLoadingComercios(true);
    const { data, error } = await supabase.from('comercios').select('*, localidades(name), rubros(name, badge_color)').order('name');
    if (!error) {
      setComercios(data || []);
    }
    setIsLoadingComercios(false);
  };

  const fetchRubros = async () => {
    setIsLoadingRubros(true);
    const { data, error } = await supabase.from('rubros').select('*').order('name');
    if (!error) {
      setRubros(data || []);
    }
    setIsLoadingRubros(false);
  };

  const fetchLocalities = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('localidades').select('*').order('name');
    if (error) {
      console.error('Error cargando localidades:', error);
    } else {
      setLocalities(data || []);
    }
    setIsLoading(false);
  };

  const fetchPreciosPlanes = async () => {
    const { data } = await supabase.from('precios_planes').select('*');
    if (data) setPreciosPlanes(data);
  };

  const fetchPlanes = async () => {
    setIsLoadingPlanes(true);
    setPlanesError(null);
    try {
      const { data, error } = await supabase.from('planes').select('*').order('duration_months');
      if (error) throw error;
      setPlanes(data || []);
    } catch (err) {
      console.error('Error fetching planes:', err);
      setPlanesError(err.message);
    } finally {
      setIsLoadingPlanes(false);
    }
  };

  const fetchPagos = async () => {
    setIsLoadingPagos(true);
    const { data } = await supabase.from('pagos').select('*, comercios(name, localidades(name)), planes(name, duration_months)').order('created_at', { ascending: false });
    if (data) setPagosHistorial(data);
    setIsLoadingPagos(false);
  };

  const handleSavePago = async () => {
    if (paymentTypeChoice === 'franquicia') {
      if (!newPagoLocalityId || !newPagoFranchiseConcept || !newPagoFranchiseAmount) {
        alert('Por favor completa todos los campos para el pago de la franquicia.');
        return;
      }
      setIsSavingPago(true);
      const selectedLocality = localities.find(l => l.id == newPagoLocalityId);
      const newFranchisePayment = {
        id: Date.now().toString(),
        locality_name: selectedLocality ? selectedLocality.name : 'Varios',
        concept: newPagoFranchiseConcept,
        amount: parseFloat(newPagoFranchiseAmount),
        date: new Date().toISOString().split('T')[0]
      };
      setPagosFranquicias(prev => [newFranchisePayment, ...prev]);
      setIsSavingPago(false);
      setShowPagoModal(false);
      setNewPagoLocalityId('');
      setNewPagoFranchiseConcept('');
      setNewPagoFranchiseAmount('');
      alert('Pago de franquicia registrado correctamente.');
      return;
    }

    if (!newPagoCommerceId || !newPagoPlanId) return;
    setIsSavingPago(true);

    const plan = planes.find(p => p.id === newPagoPlanId);
    const commerce = comercios.find(c => c.id === newPagoCommerceId);

    // Buscar precio específico para esta ciudad y plan
    const precioPlan = preciosPlanes.find(pp => pp.locality_id === commerce.locality_id && pp.plan_id === newPagoPlanId);
    const finalAmount = precioPlan ? precioPlan.price : 0;

    // Calcular nueva fecha de vencimiento
    let currentExpDate = commerce.expiration_date ? new Date(commerce.expiration_date) : new Date();
    if (currentExpDate < new Date()) currentExpDate = new Date(); // Si ya venció, arranca desde hoy

    const newExpDate = new Date(currentExpDate.setMonth(currentExpDate.getMonth() + plan.duration_months));

    // 1. Guardar Pago
    await supabase.from('pagos').insert([{
      commerce_id: newPagoCommerceId,
      plan_id: newPagoPlanId,
      amount: finalAmount
    }]);

    // 2. Actualizar Comercio
    await supabase.from('comercios').update({
      expiration_date: newExpDate.toISOString()
    }).eq('id', newPagoCommerceId);

    setIsSavingPago(false);
    setShowPagoModal(false);
    setNewPagoCommerceId('');
    setNewPagoPlanId('');
    fetchPagos();
    fetchComercios();
  };

  const handleSaveLocality = async () => {
    if (!newLocName.trim() || !newLocProv.trim()) return;
    setIsSavingLoc(true);

    const payload = {
      name: newLocName,
      province: newLocProv,
      status: newLocStatus,
      weather_link: newLocWeatherLink,
      satellite_link: newLocSatelliteLink,
      pharmacies_link: newLocPharmaciesLink,
      contact_whatsapp: newLocWhatsapp,
      admin_whatsapp: newLocAdminWhatsapp,
      commission_percentage: newLocCommission
    };

    let query;
    if (editingLocalityId) {
      query = supabase.from('localidades').update(payload).eq('id', editingLocalityId);
    } else {
      query = supabase.from('localidades').insert([payload]);
    }

    const { error } = await query;
    setIsSavingLoc(false);

    if (!error) {
      setShowLocalityModal(false);
      setEditingLocalityId(null);
      setNewLocName('');
      setNewLocProv('');
      setNewLocStatus('active');
      setNewLocWeatherLink('');
      setNewLocSatelliteLink('');
      setNewLocPharmaciesLink('');
      setNewLocWhatsapp('');
      setNewLocAdminWhatsapp('');
      fetchLocalities();
    } else {
      console.error('Error guardando:', error);
      alert('Hubo un error al guardar la localidad.');
    }
  };

  const handleEditLocalityClick = (loc) => {
    setEditingLocalityId(loc.id);
    setNewLocName(loc.name);
    setNewLocProv(loc.province);
    setNewLocStatus(loc.status || 'active');
    setNewLocWeatherLink(loc.weather_link || '');
    setLocWeatherType(loc.weather_link?.trim().startsWith('<') ? 'embed' : 'url');
    setNewLocSatelliteLink(loc.satellite_link || '');
    setLocSatelliteType(loc.satellite_link?.trim().startsWith('<') ? 'embed' : 'url');
    setNewLocPharmaciesLink(loc.pharmacies_link || '');
    setLocPharmaciesType(loc.pharmacies_link?.trim().startsWith('<') ? 'embed' : 'url');
    setNewLocWhatsapp(loc.contact_whatsapp || '');
    setNewLocAdminWhatsapp(loc.admin_whatsapp || '');
    setNewLocCommission(loc.commission_percentage || 20);
    setShowLocalityModal(true);
  };

  const handleSaveRubro = async () => {
    if (!newRubroName.trim()) return;
    setIsSavingRubro(true);
    let query;
    if (editingRubroId) {
      query = supabase.from('rubros').update({
        name: newRubroName,
        badge_color: newRubroColor
      }).eq('id', editingRubroId);
    } else {
      query = supabase.from('rubros').insert([
        { name: newRubroName, badge_color: newRubroColor, status: 'active' }
      ]);
    }

    const { error } = await query;
    setIsSavingRubro(false);
    if (!error) {
      setShowRubroModal(false);
      setEditingRubroId(null);
      setNewRubroName('');
      setNewRubroColor('badge-indigo');
      fetchRubros();
    } else {
      console.error('Error guardando rubro:', error);
      alert('Hubo un error al guardar el rubro.');
    }
  };

  const handleEditRubroClick = (rubro) => {
    setEditingRubroId(rubro.id);
    setNewRubroName(rubro.name);
    setNewRubroColor(rubro.badge_color || 'badge-indigo');
    setShowRubroModal(true);
  };

  const handleSaveCommerce = async () => {
    if (!newComName.trim() || !newComRubroId || !newComLocalityId) return;
    setIsSavingCommerce(true);

    let imageUrl = null;
    if (newComMainImageFile) {
      const fileExt = newComMainImageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `principales/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('comercios')
        .upload(filePath, newComMainImageFile);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('comercios').getPublicUrl(filePath);
        imageUrl = publicUrl;
      } else {
        console.error("Error subiendo foto:", uploadError);
      }
    }

    let finalGalleryUrls = [];
    for (const item of galleryItems) {
      if (item.file) {
        const fileExt = item.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `galeria/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('comercios').upload(filePath, item.file);
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('comercios').getPublicUrl(filePath);
          finalGalleryUrls.push(publicUrl);
        }
      } else {
        finalGalleryUrls.push(item.url);
      }
    }

    let query;
    const payload = {
      name: newComName,
      rubro_id: newComRubroId,
      locality_id: newComLocalityId,
      whatsapp: newComWhatsapp,
      address: newComAddress,
      maps_url: newComMapsUrl,
      status: 'active',
      gallery_images: finalGalleryUrls,
      business_hours: newComHours,
      description: newComDescription,
      instagram_url: newComInstagram,
      facebook_url: newComFacebook
    };

    if (imageUrl) payload.main_image = imageUrl;

    if (editingCommerceId) {
      query = supabase.from('comercios').update(payload).eq('id', editingCommerceId);
    } else {
      query = supabase.from('comercios').insert([payload]);
    }

    const { error } = await query;

    setIsSavingCommerce(false);
    if (!error) {
      setShowCommerceModal(false);
      setNewComName('');
      setNewComWhatsapp('');
      setNewComAddress('');
      setNewComMapsUrl('');
      setNewComDescription('');
      setNewComInstagram('');
      setNewComFacebook('');
      setNewComMainImageFile(null);
      setNewComMainImagePreview(null);
      setGalleryItems([]);
      setEditingCommerceId(null);
      fetchComercios();
    } else {
      console.error('Error guardando comercio:', error);
      alert('Hubo un error al guardar el comercio.');
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewComMainImageFile(file);
      setNewComMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 6 - galleryItems.length;
    const allowedFiles = files.slice(0, maxFiles);

    if (allowedFiles.length > 0) {
      const newItems = allowedFiles.map(f => ({ url: URL.createObjectURL(f), file: f }));
      setGalleryItems(prev => [...prev, ...newItems]);
    }
  };

  const handleEditCommerceClick = (commerce) => {
    setEditingCommerceId(commerce.id);
    setNewComName(commerce.name);
    setNewComLocalityId(commerce.locality_id);
    setNewComRubroId(commerce.rubro_id);
    setNewComWhatsapp(commerce.whatsapp || '');
    setNewComAddress(commerce.address || '');
    setNewComMapsUrl(commerce.maps_url || '');
    setNewComMainImagePreview(commerce.main_image || null);
    setNewComDescription(commerce.description || '');
    setNewComInstagram(commerce.instagram_url || '');
    setNewComFacebook(commerce.facebook_url || '');
    setNewComHours(commerce.business_hours || {
      mon: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
      tue: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
      wed: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
      thu: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
      fri: { open: '08:00', close: '12:00', open2: '16:00', close2: '20:00', active: true },
      sat: { open: '08:00', close: '13:00', open2: '', close2: '', active: true },
      sun: { open: '', close: '', open2: '', close2: '', active: false },
    });
    setGalleryItems((commerce.gallery_images || []).map(url => ({ url, file: null })));
    setShowCommerceModal(true);
  };

  // Modals
  const [showLocalityModal, setShowLocalityModal] = useState(false);
  const [showRubroModal, setShowRubroModal] = useState(false);
  const [showCommerceModal, setShowCommerceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [publicLocalityId, setPublicLocalityId] = useState(localStorage.getItem('dcompras_locality_id') || null);
  const [publicTab, setPublicTab] = useState('inicio'); // inicio, rubros, contacto
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('dcompras_favorites') || '[]'));
  const [showPublicLocalityModal, setShowPublicLocalityModal] = useState(false);

  // Dragging states for rubros
  const rubrosScrollRef = React.useRef(null);
  const [isRubrosDown, setIsRubrosDown] = useState(false);
  const [startRubrosX, setStartRubrosX] = useState(0);
  const [scrollRubrosLeft, setScrollRubrosLeft] = useState(0);

  // Persistir favoritos
  const [usersList, setUsersList] = useState(usersData);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRoleChoice, setNewUserRoleChoice] = useState('commerce');
  const [newUserLocalityId, setNewUserLocalityId] = useState('');
  const [newUserCommerceId, setNewUserCommerceId] = useState('');

  const handleSaveUserAccess = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Por favor completa el nombre y el correo.');
      return;
    }

    let scope = 'Global';
    let loc = 'Todas';

    if (newUserRoleChoice === 'local') {
      const selectedLoc = localities.find(l => l.id == newUserLocalityId);
      if (!selectedLoc) {
        alert('Por favor selecciona una localidad.');
        return;
      }
      scope = 'Localidad';
      loc = selectedLoc.name;
    } else if (newUserRoleChoice === 'commerce') {
      const selectedCom = comercios.find(c => c.id == newUserCommerceId);
      if (!selectedCom) {
        alert('Por favor selecciona un comercio.');
        return;
      }
      scope = selectedCom.name;
      const selectedLocForCom = localities.find(l => l.id == selectedCom.locality_id);
      loc = selectedLocForCom ? selectedLocForCom.name : 'Varios';
    }

    const newUser = {
      name: newUserName,
      email: newUserEmail,
      role: newUserRoleChoice === 'super' ? 'Super Admin' : newUserRoleChoice === 'local' ? 'Admin Local' : 'Comercio',
      scope,
      status: 'active',
      loc
    };

    setUsersList(prev => [newUser, ...prev]);

    // Reset fields & close modal
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRoleChoice('commerce');
    setNewUserLocalityId('');
    setNewUserCommerceId('');
    setShowUserModal(false);

    alert('Credenciales de acceso enviadas correctamente.');
  };

  useEffect(() => {
    localStorage.setItem('dcompras_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const checkIsOpen = (hours) => {
    if (!hours || typeof hours !== 'object') return { open: true, label: 'Abierto' };

    const now = new Date();
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = days[now.getDay()];
    const schedule = hours[today];

    if (!schedule || !schedule.active) return { open: false, label: 'Cerrado' };

    const currentTime = now.getHours() * 100 + now.getMinutes();

    const checkRange = (start, end) => {
      if (!start || !end) return false;
      const s = parseInt(start.replace(':', ''));
      const e = parseInt(end.replace(':', ''));
      return currentTime >= s && currentTime <= e;
    };

    const isOpen = checkRange(schedule.open, schedule.close) || checkRange(schedule.open2, schedule.close2);
    return { open: isOpen, label: isOpen ? 'Abierto' : 'Cerrado' };
  };

  useEffect(() => {
    if (view === 'public' && !publicLocalityId && localities.length > 0) {
      setShowPublicLocalityModal(true);
    }
  }, [view, publicLocalityId, localities.length]);

  const assignedLocality = 'Sastre'; // Admin hardcode fallback
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
          <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', padding: '15px 0' }}>
            <img src="/logo.png" alt="D'Compras Logo" style={{ maxWidth: '100%', height: '120px', objectFit: 'contain' }} />
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
                {userRole === 'superadmin' ? <ShieldCheck size={14} /> : <Building size={14} />}
                {userRole === 'superadmin' ? 'Control Total' : `Admin Local: ${assignedLocality}`}
              </div>
              <h2 className="font-outfit">
                {userRole === 'superadmin' ? 'Panel de Control Maestro' : `Panel de Gestión: ${assignedLocality}`}
              </h2>
            </div>
            <div className="header-right">
              <select value={view} onChange={(e) => setView(e.target.value)} style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', color: isDark ? '#fff' : '#000', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, borderRadius: '12px', padding: '8px 12px', outline: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', colorScheme: isDark ? 'dark' : 'light' }}>
                <option value="admin" style={{ color: isDark ? '#000' : 'inherit' }}>💻 Vista Admin</option>
                <option value="public" style={{ color: isDark ? '#000' : 'inherit' }}>📱 Vista Pública</option>
              </select>
              <button onClick={handleLogout} className="action-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>
                <LogOut size={16} /> Cerrar Sesión
              </button>
              <button className="theme-toggle" onClick={toggleTheme}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
              <div className="avatar"></div>
            </div>
          </header>

          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon indigo"><Store size={22} /></div></div><div className="stat-label">Comercios {userRole === 'localadmin' ? 'Locales' : 'Globales'}</div><div className="stat-value">{filteredCommerce.length}</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}><div className="stat-card-header"><div className="stat-icon emerald"><MapPin size={22} /></div></div><div className="stat-label">{userRole === 'localadmin' ? 'Estado Zona' : 'Localidades'}</div><div className="stat-value">{userRole === 'localadmin' ? 'Activo' : '12'}</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}><div className="stat-card-header"><div className="stat-icon pink"><Users size={22} /></div></div><div className="stat-label">Usuarios</div><div className="stat-value">{userRole === 'localadmin' ? '412' : '5,890'}</div></div>
              </div>

              <section className="table-section animate-in" style={{ animationDelay: '0.4s' }}>
                <div className="table-header">
                  <h3 className="font-outfit">
                    {userRole === 'superadmin' ? 'Últimos Comercios (Global)' : `Comercios en ${assignedLocality}`}
                  </h3>
                  <button className="btn-add" onClick={() => {
                    setActiveTab('comercios');
                    setEditingCommerceId(null);
                    setNewComName('');
                    setNewComLocalityId('');
                    setNewComRubroId('');
                    setNewComWhatsapp('');
                    setNewComAddress('');
                    setNewComMainImagePreview(null);
                    setNewComMainImageFile(null);
                    setGalleryItems([]);
                    setShowCommerceModal(true);
                  }}>
                    <Plus size={18} /> Agregar Comercio
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>Comercio</th>{userRole === 'superadmin' && <th>Localidad</th>}<th>Rubro</th><th>Vencimiento</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {filteredCommerce.map((item, i) => (
                        <tr key={i}>
                          <td className="commerce-name">{item.name}</td>
                          {userRole === 'superadmin' && <td className="commerce-loc">{item.loc}</td>}
                          <td style={{ fontSize: '0.85rem', color: item.expiration_date && new Date(item.expiration_date) < new Date() ? '#fb7185' : (isDark ? '#cbd5e1' : '#64748b') }}>
                            {item.expiration_date ? new Date(item.expiration_date).toLocaleDateString() : 'Sin plan'}
                          </td>
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
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}>
                  <div className="stat-card-header"><div className="stat-icon emerald"><TrendingUp size={22} /></div></div>
                  <div className="stat-label">Rubro más Popular</div>
                  <div className="stat-value" style={{ fontSize: '1.2rem', marginTop: '10px', color: isDark ? '#fff' : '#0f172a' }}>Gastronomía</div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}>
                  <div className="stat-card-header"><div className="stat-icon pink"><Store size={22} /></div></div>
                  <div className="stat-label">Total Comercios</div>
                  <div className="stat-value">633</div>
                </div>
              </div>

              <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
                <div className="table-header">
                  <h3 className="font-outfit">Gestión de Rubros y Servicios</h3>
                  <button className="btn-add" onClick={() => {
                    setEditingRubroId(null);
                    setNewRubroName('');
                    setNewRubroColor('badge-indigo');
                    setShowRubroModal(true);
                  }}>
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
                      {isLoadingRubros ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Cargando rubros de Supabase...</td></tr>
                      ) : rubros.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay rubros aún.</td></tr>
                      ) : (
                        rubros.map((item, i) => (
                          <tr key={item.id || i}>
                            <td style={{ fontWeight: 600, color: isDark ? '#fff' : '#0f172a' }}>{item.name}</td>
                            <td><span className={`badge ${item.badge_color || 'badge-indigo'}`}>Muestra Visual</span></td>
                            <td><span style={{ color: '#94a3b8' }}>0 comercios</span></td>
                            <td>
                              <div className={`status ${item.status === 'active' ? 'active' : 'pending'}`}>
                                <span className={`status-dot ${item.status === 'active' ? 'active' : 'pending'}`}></span>
                                {item.status === 'active' ? 'Publicado' : 'En Revisión'}
                              </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="edit-btn" onClick={() => handleEditRubroClick(item)} title="Editar Rubro">
                                <MoreVertical size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL AGREGAR RUBRO */}
              {showRubroModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>{editingRubroId ? 'Editar Rubro' : 'Crear Nuevo Rubro'}</h3>
                      <div className="close-gallery" onClick={() => setShowRubroModal(false)}><X size={24} /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre del Rubro/Servicio</label>
                        <input type="text" value={newRubroName} onChange={e => setNewRubroName(e.target.value)} placeholder="Ej: Herrería, Pintor, Veterinaria..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', display: 'block' }}>Seleccionar Color</label>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#6366f1', cursor: 'pointer', border: newRubroColor === 'badge-indigo' ? '2px solid #fff' : '2px solid transparent', boxShadow: newRubroColor === 'badge-indigo' ? '0 0 0 2px #6366f1' : 'none' }} onClick={() => setNewRubroColor('badge-indigo')}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#10b981', cursor: 'pointer', border: newRubroColor === 'badge-emerald' ? '2px solid #fff' : '2px solid transparent', boxShadow: newRubroColor === 'badge-emerald' ? '0 0 0 2px #10b981' : 'none' }} onClick={() => setNewRubroColor('badge-emerald')}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#ec4899', cursor: 'pointer', border: newRubroColor === 'badge-pink' ? '2px solid #fff' : '2px solid transparent', boxShadow: newRubroColor === 'badge-pink' ? '0 0 0 2px #ec4899' : 'none' }} onClick={() => setNewRubroColor('badge-pink')}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#06b6d4', cursor: 'pointer', border: newRubroColor === 'badge-cyan' ? '2px solid #fff' : '2px solid transparent', boxShadow: newRubroColor === 'badge-cyan' ? '0 0 0 2px #06b6d4' : 'none' }} onClick={() => setNewRubroColor('badge-cyan')}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f59e0b', cursor: 'pointer', border: newRubroColor === 'badge-amber' ? '2px solid #fff' : '2px solid transparent', boxShadow: newRubroColor === 'badge-amber' ? '0 0 0 2px #f59e0b' : 'none' }} onClick={() => setNewRubroColor('badge-amber')}></div>
                        </div>
                      </div>

                      <button onClick={handleSaveRubro} disabled={isSavingRubro || !newRubroName} className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem', opacity: (isSavingRubro || !newRubroName) ? 0.6 : 1, cursor: (isSavingRubro || !newRubroName) ? 'not-allowed' : 'pointer' }}>
                        {isSavingRubro ? 'Guardando en la Nube...' : 'Guardar y Publicar'}
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
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}><div className="stat-card-header"><div className="stat-icon emerald"><TrendingUp size={22} /></div></div><div className="stat-label">Activos / Publicados</div><div className="stat-value">{filteredCommerce.filter(c => c.status === 'active').length}</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}><div className="stat-card-header"><div className="stat-icon amber"><Bell size={22} /></div></div><div className="stat-label">En Revisión</div><div className="stat-value">{filteredCommerce.filter(c => c.status === 'pending').length}</div></div>
              </div>

              <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
                <div className="table-header">
                  <h3 className="font-outfit">Directorio de Comercios</h3>
                  <button className="btn-add" onClick={() => {
                    setEditingCommerceId(null);
                    setNewComName('');
                    setNewComLocalityId('');
                    setNewComRubroId('');
                    setNewComWhatsapp('');
                    setNewComAddress('');
                    setNewComMapsUrl('');
                    setNewComMainImagePreview(null);
                    setNewComMainImageFile(null);
                    setGalleryItems([]);
                    setShowCommerceModal(true);
                  }}>
                    <Plus size={18} /> Alta de Comercio
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Comercio</th>
                        <th>Rubro</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                        <th style={{ textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingComercios ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Cargando comercios de Supabase...</td></tr>
                      ) : comercios.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay comercios aún.</td></tr>
                      ) : (
                        comercios.map((item, i) => (
                          <tr key={item.id || i}>
                            <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {item.main_image ? (
                                <img src={item.main_image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` }} />
                              ) : (
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                  <Store size={20} />
                                </div>
                              )}
                              <div>
                                <div style={{ fontWeight: 600, color: isDark ? '#fff' : '#0f172a' }}>{item.name}</div>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.localidades?.name}</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.85rem', color: item.expiration_date && new Date(item.expiration_date) < new Date() ? '#fb7185' : (isDark ? '#e2e8f0' : '#1e293b'), fontWeight: 500 }}>
                                {item.expiration_date ? new Date(item.expiration_date).toLocaleDateString() : 'Sin plan'}
                              </div>
                              {item.expiration_date && new Date(item.expiration_date) < new Date() && (
                                <div style={{ fontSize: '0.7rem', color: '#fb7185' }}>Suscripción Vencida</div>
                              )}
                            </td>
                            <td>
                              <div className={`status ${item.status}`}>
                                <span className={`status-dot ${item.status}`}></span>
                                {item.status === 'active' ? 'Publicado' : 'Revisión'}
                              </div>
                            </td>
                            <td style={{ textAlign: 'right' }}><button className="edit-btn" onClick={() => handleEditCommerceClick(item)}>Gestionar</button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL ALTA COMERCIO */}
              {showCommerceModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '600px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>{editingCommerceId ? 'Editar Comercio' : 'Alta de Nuevo Comercio'}</h3>
                      <div className="close-gallery" onClick={() => setShowCommerceModal(false)}><X size={24} /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Comercial</label>
                          <input type="text" value={newComName} onChange={e => setNewComName(e.target.value)} placeholder="Ej: Pizzería Roma" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Localidad</label>
                          <select value={newComLocalityId} onChange={e => setNewComLocalityId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                            <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Seleccionar Localidad</option>
                            {localities.map(loc => <option key={loc.id} value={loc.id} style={{ color: isDark ? '#000' : 'inherit' }}>{loc.name}</option>)}
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Rubro Principal</label>
                          <select value={newComRubroId} onChange={e => setNewComRubroId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                            <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Seleccionar Rubro</option>
                            {rubros.map(r => <option key={r.id} value={r.id} style={{ color: isDark ? '#000' : 'inherit' }}>{r.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>WhatsApp</label>
                          <input type="text" value={newComWhatsapp} onChange={e => setNewComWhatsapp(e.target.value)} placeholder="Ej: 3406555555" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Dirección Física</label>
                          <input type="text" value={newComAddress} onChange={e => setNewComAddress(e.target.value)} placeholder="Ej: San Martín 123" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>URL de Google Maps (Opcional)</label>
                          <input type="text" value={newComMapsUrl} onChange={e => setNewComMapsUrl(e.target.value)} placeholder="Ej: https://maps.app.goo.gl/..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Breve Descripción del Comercio</label>
                        <textarea
                          value={newComDescription}
                          onChange={e => setNewComDescription(e.target.value)}
                          placeholder="Contanos qué vendés o qué servicios ofrecés..."
                          maxLength={250}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                        />
                        <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{(newComDescription || '').length}/250</div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Instagram (URL)</label>
                          <input type="text" value={newComInstagram || ''} onChange={e => setNewComInstagram(e.target.value)} placeholder="instagram.com/usuario" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Facebook (URL)</label>
                          <input type="text" value={newComFacebook || ''} onChange={e => setNewComFacebook(e.target.value)} placeholder="facebook.com/pagina" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                      </div>

                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '5px 0' }}></div>

                      <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', margin: 0 }}>Imágenes & Galería</h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'stretch' }}>
                          <input type="file" id="mainImageInput" style={{ display: 'none' }} accept="image/jpeg, image/png, image/webp" onChange={handleMainImageChange} />
                          <div onClick={() => document.getElementById('mainImageInput').click()} style={{ flex: 1, border: `2px dashed ${isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1'}`, borderRadius: '16px', padding: newComMainImagePreview ? '0' : '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', cursor: 'pointer', overflow: 'hidden', position: 'relative', minHeight: '120px' }}>
                            {newComMainImagePreview ? (
                              <img src={newComMainImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                            ) : (
                              <>
                                <Camera size={28} color="#94a3b8" />
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>Foto Principal</span>
                              </>
                            )}
                          </div>

                          <input type="file" id="galleryInput" multiple style={{ display: 'none' }} accept="image/jpeg, image/png, image/webp" onChange={handleGalleryChange} />
                          <div style={{ flex: 2, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {galleryItems.map((item, idx) => (
                              <div key={idx} style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` }}>
                                <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Gallery ${idx}`} />
                                <div onClick={(e) => { e.stopPropagation(); setGalleryItems(prev => prev.filter((_, i) => i !== idx)); }} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                                  <X size={12} />
                                </div>
                              </div>
                            ))}
                            {galleryItems.length < 6 && (
                              <div onClick={() => document.getElementById('galleryInput').click()} style={{ width: '80px', height: '80px', border: `2px dashed ${isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1'}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', cursor: 'pointer', color: '#94a3b8' }}>
                                <Plus size={24} />
                              </div>
                            )}
                          </div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Podés subir hasta 6 fotos adicionales para la galería de este comercio.</span>
                      </div>

                      <div style={{ marginTop: '20px', padding: '20px', borderRadius: '20px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}` }}>
                        <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>🕒 Horarios de Atención</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { id: 'mon', label: 'Lunes' },
                            { id: 'tue', label: 'Martes' },
                            { id: 'wed', label: 'Miércoles' },
                            { id: 'thu', label: 'Jueves' },
                            { id: 'fri', label: 'Viernes' },
                            { id: 'sat', label: 'Sábado' },
                            { id: 'sun', label: 'Domingo' }
                          ].map(day => (
                            <div key={day.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 50px', alignItems: 'center', gap: '10px', padding: '8px', background: isDark ? 'rgba(255,255,255,0.02)' : '#fff', borderRadius: '12px' }}>
                              <span style={{ fontSize: '0.85rem', color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: '500' }}>{day.label}</span>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <input type="time" value={newComHours[day.id].open} onChange={e => setNewComHours({ ...newComHours, [day.id]: { ...newComHours[day.id], open: e.target.value } })} disabled={!newComHours[day.id].active} style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', colorScheme: isDark ? 'dark' : 'light' }} />
                                <input type="time" value={newComHours[day.id].close} onChange={e => setNewComHours({ ...newComHours, [day.id]: { ...newComHours[day.id], close: e.target.value } })} disabled={!newComHours[day.id].active} style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', colorScheme: isDark ? 'dark' : 'light' }} />
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <input type="time" value={newComHours[day.id].open2} onChange={e => setNewComHours({ ...newComHours, [day.id]: { ...newComHours[day.id], open2: e.target.value } })} disabled={!newComHours[day.id].active} style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', colorScheme: isDark ? 'dark' : 'light' }} />
                                <input type="time" value={newComHours[day.id].close2} onChange={e => setNewComHours({ ...newComHours, [day.id]: { ...newComHours[day.id], close2: e.target.value } })} disabled={!newComHours[day.id].active} style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', colorScheme: isDark ? 'dark' : 'light' }} />
                              </div>
                              <input type="checkbox" checked={newComHours[day.id].active} onChange={e => setNewComHours({ ...newComHours, [day.id]: { ...newComHours[day.id], active: e.target.checked } })} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <button onClick={handleSaveCommerce} disabled={isSavingCommerce || !newComName || !newComRubroId || !newComLocalityId} className="action-btn primary" style={{ marginTop: '15px', padding: '16px', fontSize: '0.95rem', opacity: (isSavingCommerce || !newComName || !newComRubroId || !newComLocalityId) ? 0.6 : 1, cursor: (isSavingCommerce || !newComName || !newComRubroId || !newComLocalityId) ? 'not-allowed' : 'pointer' }}>
                        {isSavingCommerce ? 'Publicando...' : 'Publicar Comercio'}
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
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}><div className="stat-card-header"><div className="stat-icon amber"><Building size={22} /></div></div><div className="stat-label">Pendientes</div><div className="stat-value">3</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}><div className="stat-card-header"><div className="stat-icon pink"><Users size={22} /></div></div><div className="stat-label">Encargados</div><div className="stat-value">14</div></div>
              </div>

              <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
                <div className="table-header">
                  <h3 className="font-outfit">Gestión de Localidades</h3>
                  <button className="btn-add" onClick={() => { setEditingLocalityId(null); setNewLocName(''); setNewLocProv(''); setNewLocStatus('active'); setNewLocWeatherLink(''); setNewLocSatelliteLink(''); setNewLocPharmaciesLink(''); setLocWeatherType('url'); setLocSatelliteType('url'); setLocPharmaciesType('url'); setNewLocCommission(20); setShowLocalityModal(true); }}><MapPin size={18} /> Agregar Localidad</button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead><tr><th>Localidad</th><th>Encargado</th><th>Comisión Central</th><th>Comercios</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr></thead>
                    <tbody>
                      {isLoading ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Cargando localidades de Supabase...</td></tr>
                      ) : localities.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay localidades aún.</td></tr>
                      ) : (
                        localities.map((item, i) => (
                          <tr key={item.id || i}>
                            <td><div className="commerce-name">{item.name}</div><div className="commerce-loc">{item.province}</div></td>
                            <td style={{ fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e293b' }}>Sin Asignar <button style={{ marginLeft: '8px', padding: '2px 8px', background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: 'none', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>Asignar</button></td>
                            <td style={{ fontWeight: 600, color: '#fb7185' }}>{item.commission_percentage || 0}%</td>
                            <td><span className="badge badge-indigo">0 adheridos</span></td>
                            <td><div className={`status ${item.status === 'active' ? 'active' : item.status === 'pending' ? 'pending' : 'overdue'}`}><span className={`status-dot ${item.status === 'active' ? 'active' : item.status === 'pending' ? 'pending' : 'overdue'}`}></span>{item.status === 'active' ? 'Operativa' : item.status === 'pending' ? 'Pendiente' : 'Inactiva'}</div></td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button className="edit-btn" title="Editar Localidad" onClick={() => handleEditLocalityClick(item)}><Settings size={16} /></button>
                                <button className="edit-btn" title="Configurar Precios" onClick={() => handleEditPrices(item)} style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}><DollarSign size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* MODAL PRECIOS POR CIUDAD */}
              {showPriceModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <div>
                        <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a', margin: 0 }}>Precios en {editingPriceLocality?.name}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>Configura los costos para esta franquicia</p>
                      </div>
                      <div className="close-gallery" onClick={() => setShowPriceModal(false)}><X size={24} /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {isLoadingPlanes ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#6366f1' }}>
                          <div className="spinner" style={{ margin: '0 auto 10px auto' }}></div>
                          Cargando planes...
                        </div>
                      ) : planesError ? (
                        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#ef4444', fontSize: '0.9rem' }}>
                          ⚠️ Error: {planesError}
                        </div>
                      ) : planes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#ef4444', fontSize: '0.9rem' }}>
                          ⚠️ No se encontraron planes en la base de datos.<br />
                          Asegúrate de ejecutar el script SQL de Planes.
                        </div>
                      ) : planes.map(plan => (
                        <div key={plan.id}>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Plan {plan.name} ({plan.duration_months} meses)</label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>$</span>
                            <input
                              type="number"
                              value={tempPrices[plan.id] || 0}
                              onChange={e => setTempPrices({ ...tempPrices, [plan.id]: e.target.value })}
                              style={{ width: '100%', padding: '12px 16px 12px 30px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }}
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={handleSavePrices}
                        disabled={isSavingPrices}
                        className="action-btn primary"
                        style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem', opacity: isSavingPrices ? 0.6 : 1, cursor: 'pointer' }}
                      >
                        {isSavingPrices ? 'Guardando...' : 'Actualizar Precios en la Ciudad'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL AGREGAR LOCALIDAD */}
              {showLocalityModal && (
                <div className="inapp-viewer-backdrop">
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '550px', maxHeight: '85vh', overflowY: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>{editingLocalityId ? 'Editar Localidad' : 'Nueva Localidad'}</h3>
                      <div className="close-gallery" onClick={() => setShowLocalityModal(false)}><X size={24} /></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Localidad</label><input type="text" value={newLocName} onChange={e => setNewLocName(e.target.value)} placeholder="Ej: Sastre" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                        <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Provincia</label><input type="text" value={newLocProv} onChange={e => setNewLocProv(e.target.value)} placeholder="Ej: Santa Fe" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Comisión Central (%)</label>
                        <input type="number" value={newLocCommission} onChange={e => setNewLocCommission(e.target.value)} placeholder="Ej: 20" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>WhatsApp del Encargado (Visible en App)</label>
                        <input type="text" value={newLocWhatsapp} onChange={e => setNewLocWhatsapp(e.target.value)} placeholder="Ej: 5493406..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Estado de la Localidad</label>
                        <select value={newLocStatus} onChange={e => setNewLocStatus(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                           <option value="active" style={{ color: isDark ? '#000' : 'inherit' }}>Operativa (Visible en App)</option>
                           <option value="pending" style={{ color: isDark ? '#000' : 'inherit' }}>Pendiente (Oculta)</option>
                           <option value="inactive" style={{ color: isDark ? '#000' : 'inherit' }}>Inactiva (Oculta)</option>
                        </select>
                      </div>
                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '10px 0' }}></div>
                      <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', margin: 0 }}>Enlaces Útiles (Botones App Pública)</h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Datos del Tiempo</label>
                          <div style={{ display: 'flex', gap: '5px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
                            <button onClick={(e) => { e.preventDefault(); setLocWeatherType('url') }} style={{ background: locWeatherType === 'url' ? '#6366f1' : 'transparent', color: locWeatherType === 'url' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>URL</button>
                            <button onClick={(e) => { e.preventDefault(); setLocWeatherType('embed') }} style={{ background: locWeatherType === 'embed' ? '#6366f1' : 'transparent', color: locWeatherType === 'embed' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>Embed</button>
                          </div>
                        </div>
                        {locWeatherType === 'url' ? (
                          <input type="text" value={newLocWeatherLink} onChange={e => setNewLocWeatherLink(e.target.value)} placeholder="Ej: https://weather.com/..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        ) : (
                          <textarea value={newLocWeatherLink} onChange={e => setNewLocWeatherLink(e.target.value)} placeholder="<iframe src='...' ></iframe>" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', minHeight: '80px', resize: 'vertical' }} />
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Imagen Satelital</label>
                          <div style={{ display: 'flex', gap: '5px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
                            <button onClick={(e) => { e.preventDefault(); setLocSatelliteType('url') }} style={{ background: locSatelliteType === 'url' ? '#6366f1' : 'transparent', color: locSatelliteType === 'url' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>URL</button>
                            <button onClick={(e) => { e.preventDefault(); setLocSatelliteType('embed') }} style={{ background: locSatelliteType === 'embed' ? '#6366f1' : 'transparent', color: locSatelliteType === 'embed' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>Embed</button>
                          </div>
                        </div>
                        {locSatelliteType === 'url' ? (
                          <input type="text" value={newLocSatelliteLink} onChange={e => setNewLocSatelliteLink(e.target.value)} placeholder="Ej: https://smn.gob.ar/..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        ) : (
                          <textarea value={newLocSatelliteLink} onChange={e => setNewLocSatelliteLink(e.target.value)} placeholder="<iframe src='...' ></iframe>" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', minHeight: '80px', resize: 'vertical' }} />
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Farmacias de Turno</label>
                          <div style={{ display: 'flex', gap: '5px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', padding: '2px', borderRadius: '6px' }}>
                            <button onClick={(e) => { e.preventDefault(); setLocPharmaciesType('url') }} style={{ background: locPharmaciesType === 'url' ? '#6366f1' : 'transparent', color: locPharmaciesType === 'url' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>URL</button>
                            <button onClick={(e) => { e.preventDefault(); setLocPharmaciesType('embed') }} style={{ background: locPharmaciesType === 'embed' ? '#6366f1' : 'transparent', color: locPharmaciesType === 'embed' ? '#fff' : '#64748b', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>Embed</button>
                          </div>
                        </div>
                        {locPharmaciesType === 'url' ? (
                          <input type="text" value={newLocPharmaciesLink} onChange={e => setNewLocPharmaciesLink(e.target.value)} placeholder="Ej: https://farmacias.com/..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        ) : (
                          <textarea value={newLocPharmaciesLink} onChange={e => setNewLocPharmaciesLink(e.target.value)} placeholder="<iframe src='...' ></iframe>" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', minHeight: '80px', resize: 'vertical' }} />
                        )}
                      </div>

                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '10px 0' }}></div>
                      <h4 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={18} color="#6366f1" /> Asignar Encargado</h4>
                      <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Completo</label><input type="text" placeholder="Nombre del administrador" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Correo Electrónico</label><input type="email" placeholder="email@ejemplo.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      <div><label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>WhatsApp del Administrador (Localidad)</label><input type="text" value={newLocAdminWhatsapp} onChange={e => setNewLocAdminWhatsapp(e.target.value)} placeholder="Ej: +549..." style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} /></div>
                      <button onClick={handleSaveLocality} disabled={isSavingLoc || !newLocName || !newLocProv} className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem', opacity: (!newLocName || !newLocProv || isSavingLoc) ? 0.6 : 1, cursor: (!newLocName || !newLocProv || isSavingLoc) ? 'not-allowed' : 'pointer' }}>
                        {isSavingLoc ? 'Guardando en la Nube...' : 'Guardar y Generar Accesos'}
                      </button>
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
                <div className="stat-card animate-in">
                  <div className="stat-card-header"><div className="stat-icon emerald"><DollarSign size={22} /></div></div>
                  <div className="stat-label">Ingresos Totales (Bruto)</div>
                  <div className="stat-value">
                    ${pagosHistorial.reduce((acc, p) => acc + (p.amount || 0), 0).toLocaleString()}
                  </div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}>
                  <div className="stat-card-header"><div className="stat-icon pink"><TrendingUp size={22} /></div></div>
                  <div className="stat-label">{userRole === 'superadmin' ? 'Mis Comisiones (Regalías)' : 'A Pagar a Central'}</div>
                  <div className="stat-value" style={{ color: '#fb7185' }}>
                    ${pagosHistorial.reduce((acc, p) => {
                      const locality = localities.find(l => l.id === p.comercios?.locality_id);
                      const commission = (p.amount || 0) * ((locality?.commission_percentage || 0) / 100);
                      return acc + commission;
                    }, 0).toLocaleString()}
                  </div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}>
                  <div className="stat-card-header"><div className="stat-icon indigo"><CreditCard size={22} /></div></div>
                  <div className="stat-label">Neto Franquicia</div>
                  <div className="stat-value">
                    ${pagosHistorial.reduce((acc, p) => {
                      const locality = localities.find(l => l.id === p.comercios?.locality_id);
                      const commission = (p.amount || 0) * ((locality?.commission_percentage || 0) / 100);
                      return acc + (p.amount - commission);
                    }, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* TABS PARA PAGOS: COMERCIOS Y FRANQUICIAS */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f1f5f9', padding: '6px', borderRadius: '14px', width: 'fit-content' }}>
                <button
                  onClick={() => setActivePagosSubTab('comercios')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: activePagosSubTab === 'comercios' ? '#6366f1' : 'transparent',
                    color: activePagosSubTab === 'comercios' ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Store size={18} /> Comercios
                </button>
                {userRole === 'superadmin' && (
                  <button
                    onClick={() => setActivePagosSubTab('franquicias')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: activePagosSubTab === 'franquicias' ? '#6366f1' : 'transparent',
                      color: activePagosSubTab === 'franquicias' ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <MapPin size={18} /> Franquicias
                  </button>
                )}
              </div>

              {activePagosSubTab === 'comercios' ? (
                <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
                  <div className="table-header">
                    <h3 className="font-outfit">{userRole === 'superadmin' ? 'Historial Global de Pagos de Comercios' : 'Facturación de Comercios'}</h3>
                    <button className="btn-add" onClick={() => { setPaymentTypeChoice('comercio'); setShowPagoModal(true); }}><Plus size={18} /> Registrar Pago</button>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Comercio / Localidad</th>
                          <th>Plan Contratado</th>
                          <th>Monto Bruto</th>
                          <th>Comisión {userRole === 'superadmin' ? '(Mía)' : '(A Central)'}</th>
                          <th style={{ textAlign: 'right' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoadingPagos ? (
                          <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Cargando historial...</td></tr>
                        ) : pagosHistorial.length === 0 ? (
                          <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay pagos registrados aún.</td></tr>
                        ) : (
                          pagosHistorial.map((item, i) => {
                            const locality = localities.find(l => l.id === item.comercios?.locality_id);
                            const commissionAmount = (item.amount || 0) * ((locality?.commission_percentage || 0) / 100);
                            return (
                              <tr key={item.id || i}>
                                <td>
                                  <div className="commerce-name">{item.comercios?.name}</div>
                                  <div className="commerce-loc">{item.comercios?.localidades?.name}</div>
                                </td>
                                <td><span className="badge badge-indigo">{item.planes?.name}</span></td>
                                <td style={{ fontWeight: 600, color: isDark ? '#e2e8f0' : '#1e293b' }}>${item.amount}</td>
                                <td style={{ color: '#fb7185' }}>-${commissionAmount.toLocaleString()} ({locality?.commission_percentage}%)</td>
                                <td style={{ textAlign: 'right' }}><button className="edit-btn">Detalle</button></td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : (
                <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
                  <div className="table-header">
                    <h3 className="font-outfit">Control de Pagos de Franquicias</h3>
                    <button className="btn-add" onClick={() => { setPaymentTypeChoice('franquicia'); setShowPagoModal(true); }}><Plus size={18} /> Registrar Pago Franquicia</button>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Franquicia / Localidad</th>
                          <th>Concepto del Pago</th>
                          <th>Monto Abonado</th>
                          <th>Fecha</th>
                          <th style={{ textAlign: 'right' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagosFranquicias.length === 0 ? (
                          <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay pagos registrados para las franquicias.</td></tr>
                        ) : (
                          pagosFranquicias.map((item, i) => (
                            <tr key={item.id || i}>
                              <td>
                                <div className="commerce-name">{item.locality_name}</div>
                              </td>
                              <td style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 500 }}>{item.concept}</td>
                              <td style={{ fontWeight: 600, color: '#10b981' }}>${item.amount?.toLocaleString()}</td>
                              <td style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{item.date}</td>
                              <td style={{ textAlign: 'right' }}><button className="edit-btn">Detalle</button></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* MODAL REGISTRAR PAGO */}
              {showPagoModal && (
                <div className="gallery-modal" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '450px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="gallery-header" style={{ marginBottom: '20px' }}>
                      <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                        {paymentTypeChoice === 'franquicia' ? 'Registrar Pago Franquicia' : 'Registrar Nuevo Pago'}
                      </h3>
                      <div className="close-gallery" onClick={() => setShowPagoModal(false)}><X size={24} /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* TIPO DE PAGO: SOLO SUPERADMIN PUEDE ELEGIR */}
                      {userRole === 'superadmin' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f1f5f9', padding: '6px', borderRadius: '14px', marginBottom: '8px' }}>
                          <button
                            onClick={() => setPaymentTypeChoice('comercio')}
                            style={{
                              padding: '10px',
                              borderRadius: '10px',
                              border: 'none',
                              background: paymentTypeChoice === 'comercio' ? '#6366f1' : 'transparent',
                              color: paymentTypeChoice === 'comercio' ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                          >
                            Comercio
                          </button>
                          <button
                            onClick={() => setPaymentTypeChoice('franquicia')}
                            style={{
                              padding: '10px',
                              borderRadius: '10px',
                              border: 'none',
                              background: paymentTypeChoice === 'franquicia' ? '#6366f1' : 'transparent',
                              color: paymentTypeChoice === 'franquicia' ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                          >
                            Franquicia
                          </button>
                        </div>
                      )}

                      {paymentTypeChoice === 'franquicia' ? (
                        <>
                          <div>
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Seleccionar Franquicia (Localidad)</label>
                            <select
                              value={newPagoLocalityId}
                              onChange={e => setNewPagoLocalityId(e.target.value)}
                              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}
                            >
                              <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Buscar localidad...</option>
                              {localities.map(loc => <option key={loc.id} value={loc.id} style={{ color: isDark ? '#000' : 'inherit' }}>{loc.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Concepto del Pago</label>
                            <input
                              type="text"
                              value={newPagoFranchiseConcept}
                              onChange={e => setNewPagoFranchiseConcept(e.target.value)}
                              placeholder="Ej: Canon Mensual"
                              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Monto Abonado</label>
                            <input
                              type="number"
                              value={newPagoFranchiseAmount}
                              onChange={e => setNewPagoFranchiseAmount(e.target.value)}
                              placeholder="0.00"
                              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Seleccionar Comercio</label>
                            <select
                              value={newPagoCommerceId}
                              onChange={e => setNewPagoCommerceId(e.target.value)}
                              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}
                            >
                              <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Buscar comercio...</option>
                              {comercios
                                .filter(c => userRole === 'superadmin' || c.locality_id === assignedLocalityId)
                                .map(c => <option key={c.id} value={c.id} style={{ color: isDark ? '#000' : 'inherit' }}>{c.name} ({c.localidades?.name})</option>)
                              }
                            </select>
                          </div>

                          <div>
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Plan de Suscripción</label>
                            <select
                              value={newPagoPlanId}
                              onChange={e => setNewPagoPlanId(e.target.value)}
                              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}
                            >
                              <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Seleccionar plan...</option>
                              {planes.map(p => <option key={p.id} value={p.id} style={{ color: isDark ? '#000' : 'inherit' }}>{p.name} ({p.duration_months} meses)</option>)}
                            </select>
                          </div>

                          {newPagoCommerceId && newPagoPlanId && (
                            <div style={{ background: isDark ? 'rgba(99, 102, 241, 0.1)' : '#f0f4ff', padding: '20px', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center' }}>
                              <span style={{ display: 'block', fontSize: '0.8rem', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Precio para esta Ciudad</span>
                              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#6366f1' }}>
                                ${preciosPlanes.find(pp => pp.locality_id === comercios.find(c => c.id === newPagoCommerceId).locality_id && pp.plan_id === newPagoPlanId)?.price?.toLocaleString() || '0'}
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      <button
                        onClick={handleSavePago}
                        disabled={isSavingPago || (paymentTypeChoice === 'comercio' ? (!newPagoCommerceId || !newPagoPlanId) : (!newPagoLocalityId || !newPagoFranchiseConcept || !newPagoFranchiseAmount))}
                        className="action-btn primary"
                        style={{ padding: '16px', fontSize: '0.95rem', opacity: isSavingPago ? 0.6 : 1, cursor: 'pointer' }}
                      >
                        {isSavingPago ? 'Procesando...' : 'Confirmar Registro de Pago'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB: USUARIOS */}
          {activeTab === 'usuarios' && (
            <>
              <div className="stats-grid">
                <div className="stat-card animate-in"><div className="stat-card-header"><div className="stat-icon indigo"><ShieldCheck size={22} /></div></div><div className="stat-label">Admins {userRole === 'superadmin' ? 'Globales' : 'Locales'}</div><div className="stat-value">{userRole === 'superadmin' ? '3' : '1'}</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}><div className="stat-card-header"><div className="stat-icon emerald"><Store size={22} /></div></div><div className="stat-label">Cuentas Comercios</div><div className="stat-value">{userRole === 'superadmin' ? '142' : '38'}</div></div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}><div className="stat-card-header"><div className="stat-icon pink"><Bell size={22} /></div></div><div className="stat-label">Permisos Extendidos</div><div className="stat-value">{userRole === 'superadmin' ? '89' : '24'}</div></div>
              </div>

              <section className="table-section animate-in" style={{ animationDelay: '0.3s' }}>
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
                      {(userRole === 'superadmin' ? usersList : usersList.filter(u => u.loc === assignedLocality && u.role === 'Comercio')).map((item, i) => (
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
                      <div className="close-gallery" onClick={() => setShowUserModal(false)}><X size={24} /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Nombre Completo</label>
                          <input type="text" placeholder="Ej: Marcos Silva" value={newUserName} onChange={e => setNewUserName(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Email (Login)</label>
                          <input type="email" placeholder="email@ejemplo.com" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Rol del Usuario</label>
                        <select value={newUserRoleChoice} onChange={e => setNewUserRoleChoice(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                          {userRole === 'superadmin' && <option value="super" style={{ color: isDark ? '#000' : 'inherit' }}>Super Admin (Control Total)</option>}
                          {userRole === 'superadmin' && <option value="local" style={{ color: isDark ? '#000' : 'inherit' }}>Admin Local (Por Localidad)</option>}
                          <option value="commerce" style={{ color: isDark ? '#000' : 'inherit' }}>Administrador de Comercio</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>
                          {newUserRoleChoice === 'local' ? 'Vincular a Localidad' : newUserRoleChoice === 'commerce' ? 'Vincular a Comercio' : 'Ámbito'}
                        </label>
                        {newUserRoleChoice === 'super' ? (
                          <input type="text" value="Acceso Global" disabled style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', opacity: 0.7 }} />
                        ) : newUserRoleChoice === 'local' ? (
                          <select value={newUserLocalityId} onChange={e => setNewUserLocalityId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                            <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Seleccionar Localidad...</option>
                            {localities.map(loc => (
                              <option key={loc.id} value={loc.id} style={{ color: isDark ? '#000' : 'inherit' }}>{loc.name}</option>
                            ))}
                          </select>
                        ) : (
                          <select value={newUserCommerceId} onChange={e => setNewUserCommerceId(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none', appearance: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
                            <option value="" style={{ color: isDark ? '#000' : 'inherit' }}>Seleccionar Comercio...</option>
                            {comercios.map(com => (
                              <option key={com.id} value={com.id} style={{ color: isDark ? '#000' : 'inherit' }}>{com.name} ({com.localidades?.name})</option>
                            ))}
                          </select>
                        )}
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

                      <button onClick={handleSaveUserAccess} className="action-btn primary" style={{ marginTop: '10px', padding: '14px', fontSize: '0.9rem' }}>
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
  const renderPublic = () => {
    const currentLocalityData = localities.find(l => l.id == publicLocalityId) || {};
    const currentLocalityName = currentLocalityData.name || 'Selecciona tu localidad';
    const currentLocalityProv = currentLocalityData.province || '';

    return (
      <div className={`public-layout ${!isDark ? 'light-theme' : ''}`}>

        {/* MODAL SELECTOR LOCALIDAD PÚBLICO */}
        {showPublicLocalityModal && (
          <div className="gallery-modal" style={{ zIndex: 9999, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <MapPin size={48} color="#6366f1" style={{ margin: '0 auto 10px auto' }} />
                <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', margin: 0 }}>¿Dónde estás?</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>Selecciona tu localidad para ver los comercios cercanos.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {localities.filter(l => l.status === 'active').map(loc => (
                  <button key={loc.id} onClick={() => { setPublicLocalityId(loc.id); localStorage.setItem('dcompras_locality_id', loc.id); setShowPublicLocalityModal(false); }} style={{ padding: '15px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="locality-select-btn">
                    <span style={{ fontWeight: 600 }}>{loc.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{loc.province}</span>
                  </button>
                ))}
                {localities.filter(l => l.status === 'active').length === 0 && <p style={{ textAlign: 'center', color: '#64748b' }}>No hay localidades activas aún.</p>}
              </div>
              {publicLocalityId && (
                <button onClick={() => setShowPublicLocalityModal(false)} className="action-btn" style={{ width: '100%', marginTop: '20px', padding: '12px' }}>Cerrar</button>
              )}
            </div>
          </div>
        )}



        <header className="public-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/logo.png" alt="D'Compras Logo" style={{ height: '36px', objectFit: 'contain' }} />
            <div className="locality-selector" onClick={() => setShowPublicLocalityModal(true)} style={{ cursor: 'pointer', transition: 'all 0.2s', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{currentLocalityName}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="theme-toggle" onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{isDark ? <Sun size={20} color="#fff" /> : <Moon size={20} color="#0f172a" />}</button>
            <select value={view} onChange={(e) => setView(e.target.value)} style={{ background: 'rgba(255,255,255,0.1)', color: isDark ? '#fff' : '#0f172a', border: 'none', borderRadius: '10px', padding: '5px', cursor: 'pointer', outline: 'none', colorScheme: isDark ? 'dark' : 'light' }}>
              <option value="public" style={{ color: isDark ? '#000' : 'inherit' }}>📱</option>
              <option value="admin" style={{ color: isDark ? '#000' : 'inherit' }}>💻</option>
            </select>
          </div>
        </header>

        <section className="public-hero">
          <img src="/logo.png" alt="D'Compras Logo" style={{ height: '160px', objectFit: 'contain', margin: '0 auto 15px auto', display: 'block' }} />
          <h2 className="font-outfit" style={{ marginTop: 0 }}>Lo mejor de <br /> <b>{currentLocalityName}</b> en un solo lugar.</h2>
          <div className="public-search"><Search /><input type="text" placeholder="Buscar comercios o rubros..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>

          {(currentLocalityData.weather_link || currentLocalityData.satellite_link || currentLocalityData.pharmacies_link) && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {currentLocalityData.weather_link && (
                <button onClick={() => { setViewerTitle('El Tiempo'); setViewerUrl(currentLocalityData.weather_link); }} className="action-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Sun size={16} /> El Tiempo
                </button>
              )}
              {currentLocalityData.satellite_link && (
                <button onClick={() => { setViewerTitle('Imagen Satelital'); setViewerUrl(currentLocalityData.satellite_link); }} className="action-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Map size={16} /> Satélite
                </button>
              )}
              {currentLocalityData.pharmacies_link && (
                <button onClick={() => { setViewerTitle('Farmacia de turno'); setViewerUrl(currentLocalityData.pharmacies_link); }} className="action-btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Stethoscope size={16} /> Farmacia de turno
                </button>
              )}
            </div>
          )}
        </section>

        <div
          ref={rubrosScrollRef}
          onMouseDown={(e) => {
            setIsRubrosDown(true);
            setStartRubrosX(e.pageX - rubrosScrollRef.current.offsetLeft);
            setScrollRubrosLeft(rubrosScrollRef.current.scrollLeft);
          }}
          onMouseLeave={() => setIsRubrosDown(false)}
          onMouseUp={() => setIsRubrosDown(false)}
          onMouseMove={(e) => {
            if (!isRubrosDown) return;
            e.preventDefault();
            const x = e.pageX - rubrosScrollRef.current.offsetLeft;
            const walk = (x - startRubrosX) * 1.5;
            rubrosScrollRef.current.scrollLeft = scrollRubrosLeft - walk;
          }}
          className="category-scroll"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '15px',
            padding: '0 20px 20px 20px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: isRubrosDown ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          <div onClick={() => setSelectedPublicRubroId(null)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: '70px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: selectedPublicRubroId === null ? '#6366f1' : (isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'), color: selectedPublicRubroId === null ? '#fff' : (isDark ? '#fff' : '#0f172a'), transition: 'all 0.2s', boxShadow: selectedPublicRubroId === null ? '0 10px 15px -3px rgba(99, 102, 241, 0.4)' : 'none' }}>
              <Tags size={24} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: selectedPublicRubroId === null ? '600' : '400', color: selectedPublicRubroId === null ? (isDark ? '#fff' : '#0f172a') : '#64748b' }}>Todos</span>
          </div>
          {rubros.map((cat, i) => (
            <div key={i} onClick={() => setSelectedPublicRubroId(cat.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: '70px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: selectedPublicRubroId === cat.id ? '#6366f1' : (isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'), color: selectedPublicRubroId === cat.id ? '#fff' : (isDark ? '#fff' : '#0f172a'), transition: 'all 0.2s', boxShadow: selectedPublicRubroId === cat.id ? '0 10px 15px -3px rgba(99, 102, 241, 0.4)' : 'none' }}>
                <Tags size={24} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: selectedPublicRubroId === cat.id ? '600' : '400', color: selectedPublicRubroId === cat.id ? (isDark ? '#fff' : '#0f172a') : '#64748b', whiteSpace: 'nowrap' }}>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* CONTENIDO SEGÚN TAB SELECCIONADA */}
        {publicTab === 'inicio' && (
          <>
            {(!searchQuery && selectedPublicRubroId === null) && (
              <>
                <div className="section-title" style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-10px' }}>
                  <h3 className="font-outfit" style={{ margin: 0, color: isDark ? '#fff' : '#0f172a' }}>🔥 Destacados de la zona</h3>
                </div>
                <div style={{ display: 'flex', overflowX: 'auto', gap: '15px', padding: '15px 20px 25px 20px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', flexWrap: 'nowrap', scrollBehavior: 'smooth' }}>
                  {comercios.filter(c => c.status === 'active' && (!publicLocalityId || c.locality_id == publicLocalityId) && (!c.expiration_date || new Date(c.expiration_date) >= new Date())).slice(0, 3).map((biz, i) => (
                    <div key={`feat-${i}`} onClick={() => setSelectedBusiness(biz)} style={{ flex: '0 0 260px', background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: isDark ? '0 10px 15px -3px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(0,0,0,0.1)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`, cursor: 'pointer', transition: 'transform 0.2s', position: 'relative' }}>
                      <div style={{ height: '150px', width: '100%', backgroundImage: `url(${biz.main_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#334155', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(251, 191, 36, 0.95)', color: '#78350f', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}><Star size={12} fill="#78350f" /> Top</div>
                        <div onClick={(e) => toggleFavorite(e, biz.id)} style={{ position: 'absolute', top: '12px', left: '12px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: favorites.includes(biz.id) ? '#ef4444' : '#fff', transition: 'all 0.2s' }}>
                          <Heart size={20} fill={favorites.includes(biz.id) ? '#ef4444' : 'transparent'} />
                        </div>
                      </div>
                      <div style={{ padding: '15px' }}>
                        <h4 className="font-outfit" style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: isDark ? '#fff' : '#0f172a' }}>{biz.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{biz.rubros?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="section-title"><h3 className="font-outfit" style={{ margin: '0 20px', color: isDark ? '#fff' : '#0f172a' }}>Explorar Comercios</h3></div>

            <div className="business-feed">
              {comercios.filter(c => {
                if (c.status !== 'active') return false;
                if (c.expiration_date && new Date(c.expiration_date) < new Date()) return false;
                if (publicLocalityId && c.locality_id != publicLocalityId) return false;
                if (selectedPublicRubroId && c.rubro_id != selectedPublicRubroId) return false;
                if (!searchQuery.trim()) return true;
                const query = searchQuery.toLowerCase();
                const matchName = c.name?.toLowerCase().includes(query);
                const matchRubro = c.rubros?.name?.toLowerCase().includes(query);
                return matchName || matchRubro;
              }).map((biz, i) => (
                <div key={i} className="business-card-public animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="business-image" onClick={() => setSelectedBusiness(biz)} style={{ backgroundImage: `url(${biz.main_image || ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#334155' }}>
                    <div className="business-badge-status" style={{ background: checkIsOpen(biz.business_hours).open ? '#10b981' : '#ef4444', color: '#fff' }}>
                      {checkIsOpen(biz.business_hours).label}
                    </div>
                    <div onClick={(e) => toggleFavorite(e, biz.id)} style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: favorites.includes(biz.id) ? '#ef4444' : '#fff', transition: 'all 0.2s', zIndex: 10 }}>
                      <Heart size={22} fill={favorites.includes(biz.id) ? '#ef4444' : 'transparent'} />
                    </div>
                    {(biz.gallery_images && biz.gallery_images.length > 0) && (
                      <div style={{ position: 'absolute', bottom: '10px', left: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <Camera size={16} /><span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{biz.gallery_images.length} Fotos</span>
                      </div>
                    )}
                  </div>
                  <div className="business-info-public">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                      <h4 className="font-outfit" style={{ margin: 0, color: isDark ? '#fff' : '#0f172a' }}>{biz.name}</h4>
                      <div className="business-rating"><Star size={14} fill="#fbbf24" />{biz.rating || '5.0'}</div>
                    </div>
                    <div className="business-meta">
                      <span>{biz.rubros?.name || 'Sin Rubro'}</span><span>•</span><span>{biz.localidades?.name || 'Sin Localidad'}</span>
                    </div>
                    <div className="business-actions">
                      <button className="action-btn primary" onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/549${biz.whatsapp}`, '_blank'); }}><MessageCircle size={18} /> WhatsApp</button>
                      <button className="action-btn" onClick={(e) => {
                        e.stopPropagation();
                        if (biz.maps_url) {
                          window.open(biz.maps_url, '_blank');
                        } else {
                          const query = encodeURIComponent(`${biz.address || biz.name} ${biz.localidades?.name || ''}`);
                          window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                        }
                      }}><Navigation size={18} /> Mapa</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {publicTab === 'favoritos' && (
          <div style={{ padding: '20px', paddingBottom: '100px' }}>
            <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', marginBottom: '10px' }}>Tus Favoritos</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Los comercios que más te gustan, siempre a mano.</p>

            <div className="business-feed">
              {comercios.filter(c => favorites.includes(c.id)).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', borderRadius: '24px', border: `2px dashed ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` }}>
                  <Heart size={48} color="#64748b" style={{ margin: '0 auto 15px auto', opacity: 0.5 }} />
                  <h4 style={{ color: isDark ? '#fff' : '#0f172a', margin: '0 0 5px 0' }}>Aún no tienes favoritos</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Toca el corazón en cualquier comercio para guardarlo aquí.</p>
                </div>
              ) : (
                comercios.filter(c => favorites.includes(c.id)).map((biz, i) => (
                  <div key={i} className="business-card-public animate-in">
                    <div className="business-image" onClick={() => setSelectedBusiness(biz)} style={{ backgroundImage: `url(${biz.main_image || ''})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#334155' }}>
                      <div className="business-badge-status" style={{ background: checkIsOpen(biz.business_hours).open ? '#10b981' : '#ef4444', color: '#fff' }}>
                        {checkIsOpen(biz.business_hours).label}
                      </div>
                      <div onClick={(e) => toggleFavorite(e, biz.id)} style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', zIndex: 10 }}>
                        <Heart size={22} fill="#ef4444" />
                      </div>
                    </div>
                    <div className="business-info-public">
                      <h4 className="font-outfit" style={{ margin: 0, color: isDark ? '#fff' : '#0f172a' }}>{biz.name}</h4>
                      <div className="business-meta">
                        <span>{biz.rubros?.name}</span><span>•</span><span>{biz.localidades?.name}</span>
                      </div>
                      <div className="business-actions">
                        <button className="action-btn primary" onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/549${biz.whatsapp}`, '_blank'); }}><MessageCircle size={18} /> WhatsApp</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {publicTab === 'rubros' && (
          <div style={{ padding: '20px' }}>
            <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', marginBottom: '20px' }}>Todos los Rubros</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {rubros.map((cat) => (
                <div key={cat.id} onClick={() => { setSelectedPublicRubroId(cat.id); setPublicTab('inicio'); window.scrollTo(0, 0); }} style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#fff', padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.1)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`, cursor: 'pointer' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tags size={24} />
                  </div>
                  <span style={{ color: isDark ? '#fff' : '#0f172a', fontWeight: '600', fontSize: '0.9rem', textAlign: 'center' }}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {publicTab === 'contacto' && (
          <div style={{ padding: '20px', paddingBottom: '100px' }}>
            <h3 className="font-outfit" style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', marginBottom: '10px' }}>Contacto & Soporte</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '30px' }}>¿Necesitas ayuda o quieres anunciar tu negocio?</p>

            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', padding: '25px', borderRadius: '24px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}`, marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, color: isDark ? '#fff' : '#0f172a' }}>Representante Local</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Franquicia {currentLocalityName}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const phone = currentLocalityData.contact_whatsapp || '5493775473317'; // Fallback a central si no hay local
                  window.open(`https://wa.me/${phone}`, '_blank');
                }}
                className="action-btn primary"
                style={{ width: '100%', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366' }}
              >
                <MessageCircle size={20} /> Hablar por WhatsApp
              </button>
            </div>

            <div style={{ background: isDark ? 'rgba(239, 68, 68, 0.05)' : '#fef2f2', padding: '25px', borderRadius: '24px', border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2'}` }}>
              <h4 style={{ margin: '0 0 10px 0', color: isDark ? '#ef4444' : '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={20} /> Casa Central
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#7f1d1d' }}>Para quejas, denuncias o soporte técnico directo con la administración central de D'Compras.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => window.open('mailto:soporte@dcompras.com.ar')} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontWeight: '600', cursor: 'pointer' }}>
                  Enviar Correo Electrónico
                </button>
                <button onClick={() => window.open('https://wa.me/5493775473317', '_blank')} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                  Soporte WhatsApp Central
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedBusiness && (
          <div className="business-detail-backdrop" onClick={() => setSelectedBusiness(null)}>
            <div style={{ background: isDark ? '#0f172a' : '#ffffff', width: '100%', maxWidth: '600px', margin: '0 auto', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'slideUp 0.3s ease-out', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
              <div style={{ height: '200px', width: '100%', position: 'relative', backgroundImage: `url(${selectedBusiness.main_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#334155' }}>
                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedBusiness(null)}><X size={20} /></div>
                <div style={{ position: 'absolute', bottom: '-1px', left: '0', width: '100%', height: '80px', background: `linear-gradient(to top, ${isDark ? '#0f172a' : '#ffffff'}, transparent)` }}></div>
              </div>
              <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto' }}>
                <h3 className="font-outfit" style={{ fontSize: '1.8rem', margin: '0 0 5px 0', color: isDark ? '#fff' : '#0f172a' }}>{selectedBusiness.name}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>{selectedBusiness.rubros?.name || 'Sin rubro'}</span>
                  <span style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {selectedBusiness.address ? `${selectedBusiness.address}, ` : ''}{selectedBusiness.localidades?.name}</span>
                </div>

                {selectedBusiness.description && (
                  <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 20px 0', padding: '15px', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc', borderRadius: '16px', borderLeft: '4px solid #6366f1' }}>
                    {selectedBusiness.description}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                  {selectedBusiness.instagram_url && (
                    <button
                      onClick={() => {
                        const url = selectedBusiness.instagram_url.startsWith('http') ? selectedBusiness.instagram_url : `https://${selectedBusiness.instagram_url}`;
                        window.open(url, '_blank');
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', borderRadius: '12px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                      <Globe size={18} /> Instagram
                    </button>
                  )}
                  {selectedBusiness.facebook_url && (
                    <button
                      onClick={() => {
                        const url = selectedBusiness.facebook_url.startsWith('http') ? selectedBusiness.facebook_url : `https://${selectedBusiness.facebook_url}`;
                        window.open(url, '_blank');
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', borderRadius: '12px', background: '#1877F2', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                      <Globe size={18} /> Facebook
                    </button>
                  )}
                </div>

                {(selectedBusiness.gallery_images && selectedBusiness.gallery_images.length > 0) && (
                  <>
                    <h4 style={{ fontSize: '1.1rem', margin: '20px 0 10px 0', color: isDark ? '#fff' : '#0f172a' }}>Galería de Fotos</h4>
                    <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '15px', paddingRight: '20px', scrollbarWidth: 'auto', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'auto', flexWrap: 'nowrap' }}>
                      {selectedBusiness.gallery_images.map((url, n) => (
                        <div key={n} style={{ width: '140px', height: '140px', flex: '0 0 auto', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.2)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}` }}>
                          <img src={url} alt={`Gallery ${n}`} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} onClick={() => { setViewerTitle(`Foto ${n + 1}`); setViewerUrl(url); }} />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="action-btn primary" style={{ flex: 1, marginTop: '25px', padding: '16px', fontSize: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', boxShadow: '0 10px 15px -3px rgba(37, 211, 102, 0.3)', border: 'none', cursor: 'pointer' }} onClick={() => {
                    const msg = encodeURIComponent(`Hola, vi su comercio en D'Compras y me gustaría hacerles una consulta.`);
                    window.open(`https://wa.me/549${selectedBusiness.whatsapp}?text=${msg}`, '_blank');
                  }}>
                    <MessageCircle size={22} /> WhatsApp
                  </button>
                  <button className="action-btn" style={{ flex: 1, marginTop: '25px', padding: '16px', fontSize: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9', color: isDark ? '#fff' : '#0f172a', border: 'none', cursor: 'pointer' }} onClick={() => {
                    if (selectedBusiness.maps_url) {
                      window.open(selectedBusiness.maps_url, '_blank');
                    } else {
                      const query = encodeURIComponent(`${selectedBusiness.address || selectedBusiness.name} ${selectedBusiness.localidades?.name || ''}`);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                    }
                  }}>
                    <Navigation size={22} /> Ver en Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <nav className="bottom-nav">
          <div className={`nav-tab ${publicTab === 'inicio' ? 'active' : ''}`} onClick={() => setPublicTab('inicio')}><Home size={24} /><span>Inicio</span></div>
          <div className={`nav-tab ${publicTab === 'rubros' ? 'active' : ''}`} onClick={() => setPublicTab('rubros')}><Tags size={24} /><span>Rubros</span></div>
          <div className={`nav-tab ${publicTab === 'favoritos' ? 'active' : ''}`} onClick={() => setPublicTab('favoritos')}><Heart size={24} /><span>Favoritos</span></div>
          <div className={`nav-tab ${publicTab === 'contacto' ? 'active' : ''}`} onClick={() => setPublicTab('contacto')}><Headset size={24} /><span>Contacto</span></div>
        </nav>

        {/* IN-APP VIEWER MODAL (OVER ALL) */}
        {viewerUrl && (
          <div className="inapp-viewer-backdrop">
            <div className="viewer-container">
              <div style={{ padding: '15px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isDark ? '#1e293b' : '#f8fafc' }}>
                <h3 className="font-outfit" style={{ margin: 0, color: isDark ? '#fff' : '#0f172a', fontSize: '1.1rem' }}>{viewerTitle}</h3>
                <button onClick={() => setViewerUrl(null)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <div style={{ flex: 1, position: 'relative', background: isDark ? '#0f172a' : '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {viewerUrl.trim().startsWith('<') ? (
                  <iframe srcDoc={viewerUrl} style={{ width: '100%', height: '100%', border: 'none' }} title={viewerTitle} allowFullScreen></iframe>
                ) : (
                  viewerUrl.match(/\.(jpeg|jpg|gif|png|webp|avif|jfif)(\?.*)?$/i) ? (
                    <img src={viewerUrl} alt={viewerTitle} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                  ) : (
                    <iframe src={viewerUrl} style={{ width: '100%', height: '100%', border: 'none' }} title={viewerTitle} allowFullScreen></iframe>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const renderLogin = () => (
    <div style={{ display: 'flex', height: '100vh', background: isDark ? '#0f172a' : '#f8fafc', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: isDark ? '#1e293b' : '#ffffff', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="brand-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%' }}><img src="/logo.png" alt="D'Compras Logo" style={{ maxWidth: '100%', height: '150px', objectFit: 'contain' }} /></div>
          <h2 style={{ color: isDark ? '#fff' : '#0f172a', fontSize: '1.5rem', margin: 0 }}>Iniciar Sesión</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>Ingresá tus credenciales de administrador</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Correo Electrónico</label>
            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="tu@email.com" required style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', display: 'block' }}>Contraseña</label>
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
          </div>
          {loginError && <div style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px' }}>{loginError.includes('Invalid') ? 'Credenciales incorrectas' : loginError}</div>}
          <button type="submit" className="action-btn primary" style={{ padding: '16px', fontSize: '1rem', marginTop: '10px' }}>Ingresar al Sistema</button>
        </form>
      </div>
    </div>
  );

  if (authLoading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0f172a' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem' }}>Autenticando...</div>;
  if (view === 'login') return renderLogin();
  if (view === 'admin') return renderAdmin();
  return renderPublic();
}

export default App;
