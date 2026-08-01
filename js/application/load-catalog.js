import { createCollection } from '../domain/entities.js';

export function loadCatalog(catalogRepository) {
  return catalogRepository.load().then(createCollection);
}
