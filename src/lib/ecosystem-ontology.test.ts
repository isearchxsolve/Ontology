import { describe, expect, it } from "vitest";
import {
  buildOntologyAtoms,
  buildOntologyTriples,
  ecosystemApps,
  validateOntologyCatalog,
} from "./ecosystem-ontology";

describe("ecosystem ontology catalog", () => {
  it("contains every Mission 04 ecosystem application exactly once", () => {
    expect(ecosystemApps).toHaveLength(15);
    expect(new Set(ecosystemApps.map((app) => app.id)).size).toBe(15);
  });

  it("has complete required metadata for every application", () => {
    for (const app of ecosystemApps) {
      expect(app.id).not.toHaveLength(0);
      expect(app.name).not.toHaveLength(0);
      expect(app.repository).not.toHaveLength(0);
      expect(app.description).not.toHaveLength(0);
      expect(app.types).toContain("EcosystemApp");
    }
  });

  it("accepts the catalog only when all types and relationship rules are valid", () => {
    expect(() => validateOntologyCatalog()).not.toThrow();
  });

  it("creates deterministic and duplicate-free atoms", () => {
    const first = buildOntologyAtoms();
    const second = buildOntologyAtoms();

    expect(first).toEqual(second);
    expect(new Set(first.map((atom) => atom.value)).size).toBe(first.length);

    for (const app of ecosystemApps) {
      expect(first.some((atom) => atom.key === `app:${app.id}`)).toBe(true);
      expect(first.some((atom) => atom.key === `repo:${app.id}`)).toBe(true);
    }
  });

  it("creates valid, deterministic triples whose endpoints are published atoms", () => {
    const atoms = new Set(buildOntologyAtoms().map((atom) => atom.value));
    const first = buildOntologyTriples();
    const second = buildOntologyTriples();

    expect(first).toEqual(second);
    expect(first.length).toBeGreaterThan(ecosystemApps.length * 2);

    for (const triple of first) {
      expect(atoms.has(triple.subject) || triple.subject.startsWith("intuition-box:relationship-rule:")).toBe(true);
      expect(atoms.has(triple.predicate)).toBe(true);
      expect(atoms.has(triple.object)).toBe(true);
    }
  });

  it("publishes an explicit app-to-repository assertion for every ecosystem application", () => {
    const triples = buildOntologyTriples();

    for (const app of ecosystemApps) {
      expect(triples).toContainEqual({
        subject: `intuition-box:app:${app.id}`,
        predicate: "intuition-box:predicate:hasRepository",
        object: `intuition-box:repository:${app.repository}`,
      });
    }
  });
});
