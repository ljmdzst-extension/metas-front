import { useMemo } from 'react';
import { UserShortData } from '@/types/UserProps';

const useFilteredUsers = (users: UserShortData[], searchQuery: string) => {
  const lowercasedQuery = searchQuery.toLowerCase();

  return useMemo(() => {
    if (!searchQuery) return users;

    return users.filter(user => {
      const personaMatches = [user.ape, user.nom, user.nroDoc, user.email].some(value =>
        value.toLowerCase().includes(lowercasedQuery),
      );

      const categoriasMatches = user.categorias.some(categoria =>
        categoria.nombre.toLowerCase().includes(lowercasedQuery),
      );

      const permisosMatches = user.permisos.some(permiso =>
        permiso.nombre.toLowerCase().includes(lowercasedQuery),
      );

      return personaMatches || categoriasMatches || permisosMatches;
    });
  }, [users, searchQuery]);
};

export default useFilteredUsers;