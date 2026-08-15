/**
 * @typedef {import('../domain/entities.js').Collection} Collection
 * @typedef {import('./ports/catalog-repository.js').CatalogRepository} CatalogRepository
 */

export class LoadCatalog {
  /**
   * @param {{ catalogRepository: CatalogRepository }} deps
   */
  constructor({ catalogRepository }) {
    this.catalogRepository = catalogRepository;
  }

  /**
   * @returns {Promise<Collection>}
   */
  execute() {
    return this.catalogRepository.load();
  }
}
