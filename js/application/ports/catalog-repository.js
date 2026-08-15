/**
 * Port: reads the Catalog index.
 * Abstract base class — extended by concrete adapters (e.g. JsonCatalogRepository).
 */
export class CatalogRepository {
  constructor() {
    if (new.target === CatalogRepository) {
      throw new TypeError('CatalogRepository is abstract');
    }
  }

  /**
   * @abstract
   * @returns {Promise<import('../../domain/entities.js').Collection>}
   */
  load() {
    throw new Error('CatalogRepository.load() not implemented');
  }
}
