const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API Error: ${response.status}`);
  }

  // Handle empty responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// Service functions for each domain could be built on top of this,
// or we can export a general API object.
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data?: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  patch: <T>(endpoint: string, data?: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};
