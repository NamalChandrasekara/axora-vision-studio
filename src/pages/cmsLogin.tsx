import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Mail, Shield, AlertCircle, CheckCircle, LogOut, Plus, Edit, Trash2, Star, XCircle, Briefcase, MessageSquare } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  isPublished: boolean;
  createdAt: string;
}

interface Project {
  _id: string;
  name: string;
  client: string;
  request: string;
  difficulties: string;
  thumbnail: string;
  media: Array<{ type: 'image' | 'video'; url: string }>;
  isPublished: boolean;
  createdAt: string;
}

// Login Component
const CMSLogin = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCredentialsSubmit = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMaskedEmail(data.email);
        setSuccess('OTP sent to your email!');
        setStep('otp');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Login successful!');
        localStorage.setItem('cms_token', data.token);
        localStorage.setItem('cms_user', JSON.stringify(data.user));
        setTimeout(() => onLoginSuccess(data.token), 1000);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CMS Login
          </CardTitle>
          <CardDescription>
            {step === 'credentials' ? 'Enter credentials to receive OTP' : 'Enter the OTP sent to your email'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {step === 'credentials' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCredentialsSubmit()}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCredentialsSubmit()}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                onClick={handleCredentialsSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={isLoading || !username || !password}
              >
                {isLoading ? 'Processing...' : 'Send OTP'}
              </Button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">OTP sent to:</p>
                    <p className="text-sm text-blue-700">{maskedEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={(e) => e.key === 'Enter' && otp.length === 6 && handleOTPSubmit()}
                  className="text-center text-2xl font-bold tracking-widest"
                  maxLength={6}
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-xs text-gray-500 text-center">OTP is valid for 10 minutes</p>
              </div>

              <Button
                onClick={handleOTPSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep('credentials');
                  setOtp('');
                  setError('');
                  setSuccess('');
                }}
                className="w-full"
                disabled={isLoading}
              >
                Back to login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Dashboard Component
const CMSDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'projects'>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', position: '', company: '', content: '', rating: 5, image: '', isPublished: true
  });

  const [projectForm, setProjectForm] = useState({
    name: '', client: '', request: '', difficulties: '', thumbnail: '', 
    media: [] as Array<{ type: 'image' | 'video'; url: string }>, 
    isPublished: true
  });

  useEffect(() => {
    if (activeTab === 'testimonials') {
      fetchTestimonials();
    } else {
      fetchProjects();
    }
  }, [activeTab]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('cms_token');
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/testimonials`, { headers: getAuthHeader() });
      if (response.status === 401 || response.status === 403) {
        onLogout();
        return;
      }
      const data = await response.json();
      if (data.success) setTestimonials(data.data);
    } catch (err) {
      setError('Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/projects`, { headers: getAuthHeader() });
      if (response.status === 401 || response.status === 403) {
        onLogout();
        return;
      }
      const data = await response.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTestimonialForm({ name: '', position: '', company: '', content: '', rating: 5, image: '', isPublished: true });
    setProjectForm({ name: '', client: '', request: '', difficulties: '', thumbnail: '', media: [], isPublished: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleTestimonialSubmit = async () => {
    setError('');
    setSuccess('');
    if (!testimonialForm.name || !testimonialForm.content) {
      setError('Name and content are required');
      return;
    }

    try {
      const url = editingId ? `${API_BASE_URL}/api/testimonials/${editingId}` : `${API_BASE_URL}/api/testimonials`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(testimonialForm) });
      const data = await response.json();
      if (data.success) {
        setSuccess(editingId ? 'Testimonial updated!' : 'Testimonial created!');
        fetchTestimonials();
        resetForm();
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('Failed to save testimonial');
    }
  };

  const handleProjectSubmit = async () => {
    setError('');
    setSuccess('');
    if (!projectForm.name || !projectForm.client || !projectForm.request) {
      setError('Name, client, and request are required');
      return;
    }

    try {
      const url = editingId ? `${API_BASE_URL}/api/projects/${editingId}` : `${API_BASE_URL}/api/projects`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(projectForm) });
      const data = await response.json();
      if (data.success) {
        setSuccess(editingId ? 'Project updated!' : 'Project created!');
        fetchProjects();
        resetForm();
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('Failed to save project');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, { method: 'DELETE', headers: getAuthHeader() });
      const data = await response.json();
      if (data.success) {
        setSuccess('Testimonial deleted!');
        fetchTestimonials();
      }
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: 'DELETE', headers: getAuthHeader() });
      const data = await response.json();
      if (data.success) {
        setSuccess('Project deleted!');
        fetchProjects();
      }
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const addMediaItem = () => {
    setProjectForm({ ...projectForm, media: [...projectForm.media, { type: 'image', url: '' }] });
  };

  const updateMediaItem = (index: number, field: 'type' | 'url', value: string) => {
    const newMedia = [...projectForm.media];
    newMedia[index] = { ...newMedia[index], [field]: value };
    setProjectForm({ ...projectForm, media: newMedia });
  };

  const removeMediaItem = (index: number) => {
    setProjectForm({ ...projectForm, media: projectForm.media.filter((_, i) => i !== index) });
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
            <p className="text-sm text-gray-500">Manage Content</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => { setActiveTab('testimonials'); resetForm(); }}
            variant={activeTab === 'testimonials' ? 'default' : 'outline'}
            className={activeTab === 'testimonials' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <MessageSquare className="w-4 h-4 mr-2" /> Testimonials
          </Button>
          <Button
            onClick={() => { setActiveTab('projects'); resetForm(); }}
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            className={activeTab === 'projects' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <Briefcase className="w-4 h-4 mr-2" /> Projects
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" /> Add New {activeTab === 'testimonials' ? 'Testimonial' : 'Project'}
          </Button>
        )}

        {showForm && activeTab === 'testimonials' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit' : 'Add New'} Testimonial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input value={testimonialForm.position} onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={testimonialForm.company} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Input type="number" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Image URL</Label>
                  <Input value={testimonialForm.image} onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Content *</Label>
                  <Textarea value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} className="min-h-32" />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="pub" checked={testimonialForm.isPublished} onChange={(e) => setTestimonialForm({ ...testimonialForm, isPublished: e.target.checked })} className="w-4 h-4" />
                  <Label htmlFor="pub">Publish immediately</Label>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleTestimonialSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600">{editingId ? 'Update' : 'Create'}</Button>
                <Button onClick={resetForm} variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showForm && activeTab === 'projects' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit' : 'Add New'} Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Client *</Label>
                  <Input value={projectForm.client} onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Request *</Label>
                  <Textarea value={projectForm.request} onChange={(e) => setProjectForm({ ...projectForm, request: e.target.value })} className="min-h-24" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Difficulties</Label>
                  <Textarea value={projectForm.difficulties} onChange={(e) => setProjectForm({ ...projectForm, difficulties: e.target.value })} className="min-h-24" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Thumbnail URL</Label>
                  <Input value={projectForm.thumbnail} onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })} />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Media Items</Label>
                    <Button type="button" onClick={addMediaItem} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" /> Add Media
                    </Button>
                  </div>
                  {projectForm.media.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start p-3 border rounded-lg">
                      <div className="flex-1 space-y-2">
                        <select
                          value={item.type}
                          onChange={(e) => updateMediaItem(idx, 'type', e.target.value as 'image' | 'video')}
                          className="w-full p-2 border rounded"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <Input
                          value={item.url}
                          onChange={(e) => updateMediaItem(idx, 'url', e.target.value)}
                          placeholder="Media URL"
                        />
                      </div>
                      <Button type="button" onClick={() => removeMediaItem(idx)} size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="projPub" checked={projectForm.isPublished} onChange={(e) => setProjectForm({ ...projectForm, isPublished: e.target.checked })} className="w-4 h-4" />
                  <Label htmlFor="projPub">Publish immediately</Label>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleProjectSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600">{editingId ? 'Update' : 'Create'}</Button>
                <Button onClick={resetForm} variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'testimonials' && (
          <>
            <h2 className="text-xl font-bold mb-4">All Testimonials ({testimonials.length})</h2>
            {isLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>
            ) : testimonials.length === 0 ? (
              <Card><CardContent className="text-center py-12 text-gray-500">No testimonials yet</CardContent></Card>
            ) : (
              <div className="grid gap-4">
                {testimonials.map((t) => (
                  <Card key={t.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {t.image && <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                            <div>
                              <h3 className="font-bold text-xl">{t.name}</h3>
                              {t.position && <p className="text-sm text-gray-600">{t.position}{t.company && ` at ${t.company}`}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-3">{t.content}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            {t.isPublished ? (
                              <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-3 h-3" />Published</span>
                            ) : (
                              <span className="flex items-center gap-1 text-gray-600"><XCircle className="w-3 h-3" />Draft</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button onClick={() => {
                            setTestimonialForm({
                              name: t.name,
                              position: t.position,
                              company: t.company,
                              content: t.content,
                              rating: t.rating,
                              image: t.image,
                              isPublished: t.isPublished
                            });
                            setEditingId(t.id);
                            setShowForm(true);
                          }} size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteTestimonial(t.id)} size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'projects' && (
  <>
    <h2 className="text-xl font-bold mb-4">All Projects ({projects.length})</h2>
    {isLoading ? (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    ) : projects.length === 0 ? (
      <Card>
        <CardContent className="text-center py-12 text-gray-500">
          No projects yet
        </CardContent>
      </Card>
    ) : (
      <div className="grid gap-4">
        {projects.map((p) => (
          <Card key={p._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {p.thumbnail && (
                      <img 
                        src={p.thumbnail} 
                        alt={p.name} 
                        className="w-16 h-16 rounded object-cover" 
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-600">Client: {p.client}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Request:</p>
                      <p className="text-gray-600">{p.request}</p>
                    </div>
                    
                    {p.difficulties && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Difficulties:</p>
                        <p className="text-gray-600">{p.difficulties}</p>
                      </div>
                    )}
                    
                    {p.media.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Media: {p.media.length} item(s)</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    {p.isPublished ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" />Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-600">
                        <XCircle className="w-3 h-3" />Draft
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => {
                      setProjectForm({
                        name: p.name,
                        client: p.client,
                        request: p.request,
                        difficulties: p.difficulties,
                        thumbnail: p.thumbnail,
                        media: p.media,
                        isPublished: p.isPublished
                      });
                      setEditingId(p._id);
                      setShowForm(true);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteProject(p._id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </>
)}
      </div>
    </div>
  );
};

// Main App
const CMSApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? (
    <CMSDashboard onLogout={handleLogout} />
  ) : (
    <CMSLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  );
};

export default CMSApp;
