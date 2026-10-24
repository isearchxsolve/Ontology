export type AtomTypeId =
  | "EcosystemApp"
  | "SourceRepository"
  | "Feature"
  | "Protocol"
  | "Agent"
  | "Community"
  | "FeePolicy"
  | "Vault"
  | "TrustSignal"
  | "InfrastructureNode"
  | "RpcEndpoint"
  | "McpServer"
  | "GraphView"
  | "IdeationWorkflow"
  | "OrganizationValue";

export type PredicateId =
  | "hasType"
  | "hasRepository"
  | "usesProtocol"
  | "hasFeature"
  | "servesCommunity"
  | "manages"
  | "propagates"
  | "exposes"
  | "inspects"
  | "visualizes"
  | "attests"
  | "represents";

export interface AtomTypeDefinition {
  id: AtomTypeId;
  label: string;
  description: string;
}

export interface PredicateDefinition {
  id: PredicateId;
  label: string;
  description: string;
}

export interface RelationshipRule {
  subject: AtomTypeId;
  predicate: PredicateId;
  object: AtomTypeId;
}

export interface EcosystemAppDefinition {
  id: string;
  name: string;
  repository: string;
  description: string;
  types: AtomTypeId[];
  features: string[];
}

export interface OntologyAtom {
  key: string;
  value: string;
}

export interface OntologyTriple {
  subject: string;
  predicate: string;
  object: string;
}

export interface OnchainReceipt {
  id: string;
  transactionHash: string;
}

export interface OnchainOntologyClient {
  createOrResolveAtom(value: string): Promise<OnchainReceipt>;
  createOrResolveTriple(input: {
    subjectAtomId: string;
    predicateAtomId: string;
    objectAtomId: string;
  }): Promise<OnchainReceipt>;
}

export interface PublicationReceipt {
  atoms: Record<string, OnchainReceipt>;
  triples: OnchainReceipt[];
}

const atomTypeDefinitions: readonly AtomTypeDefinition[] = [
  { id: "EcosystemApp", label: "Ecosystem App", description: "An application in the Intuition ecosystem." },
  { id: "SourceRepository", label: "Source Repository", description: "A source-code repository for an ecosystem application." },
  { id: "Feature", label: "Feature", description: "A user-facing or infrastructure capability." },
  { id: "Protocol", label: "Protocol", description: "A protocol used or exposed by an application." },
  { id: "Agent", label: "Agent", description: "A human or autonomous software agent." },
  { id: "Community", label: "Community", description: "A group served by an ecosystem application." },
  { id: "FeePolicy", label: "Fee Policy", description: "A fee-collection or fee-distribution policy." },
  { id: "Vault", label: "Vault", description: "A MultiVault or other managed vault." },
  { id: "TrustSignal", label: "Trust Signal", description: "A claim, attestation, or reputation signal." },
  { id: "InfrastructureNode", label: "Infrastructure Node", description: "A node participating in application infrastructure." },
  { id: "RpcEndpoint", label: "RPC Endpoint", description: "A remote procedure call endpoint." },
  { id: "McpServer", label: "MCP Server", description: "A Model Context Protocol server." },
  { id: "GraphView", label: "Graph View", description: "A graph exploration or visualization surface." },
  { id: "IdeationWorkflow", label: "Ideation Workflow", description: "A structured workflow for creating and refining ideas." },
  { id: "OrganizationValue", label: "Organization Value", description: "A declared organizational value." },
];

const predicateDefinitions: readonly PredicateDefinition[] = [
  { id: "hasType", label: "has type", description: "Classifies an entity with an atom type." },
  { id: "hasRepository", label: "has repository", description: "Associates an application with its source repository." },
  { id: "usesProtocol", label: "uses protocol", description: "Declares protocol usage." },
  { id: "hasFeature", label: "has feature", description: "Associates an application with a capability." },
  { id: "servesCommunity", label: "serves community", description: "Associates an application with a community." },
  { id: "manages", label: "manages", description: "Declares management of a vault or infrastructure asset." },
  { id: "propagates", label: "propagates", description: "Propagates a trust signal." },
  { id: "exposes", label: "exposes", description: "Exposes an endpoint or service." },
  { id: "inspects", label: "inspects", description: "Inspects an MCP server or graph resource." },
  { id: "visualizes", label: "visualizes", description: "Visualizes graph data." },
  { id: "attests", label: "attests", description: "Creates or records an attestation." },
  { id: "represents", label: "represents", description: "Represents an agent, value, or domain entity." },
];

const relationshipRules: readonly RelationshipRule[] = [
  { subject: "EcosystemApp", predicate: "hasRepository", object: "SourceRepository" },
  { subject: "EcosystemApp", predicate: "usesProtocol", object: "Protocol" },
  { subject: "EcosystemApp", predicate: "hasFeature", object: "Feature" },
  { subject: "EcosystemApp", predicate: "servesCommunity", object: "Community" },
  { subject: "EcosystemApp", predicate: "manages", object: "Vault" },
  { subject: "EcosystemApp", predicate: "manages", object: "InfrastructureNode" },
  { subject: "EcosystemApp", predicate: "propagates", object: "TrustSignal" },
  { subject: "EcosystemApp", predicate: "exposes", object: "RpcEndpoint" },
  { subject: "EcosystemApp", predicate: "exposes", object: "McpServer" },
  { subject: "EcosystemApp", predicate: "inspects", object: "McpServer" },
  { subject: "EcosystemApp", predicate: "visualizes", object: "GraphView" },
  { subject: "EcosystemApp", predicate: "attests", object: "TrustSignal" },
  { subject: "EcosystemApp", predicate: "represents", object: "Agent" },
  { subject: "EcosystemApp", predicate: "represents", object: "OrganizationValue" },
];

export const ecosystemApps: readonly EcosystemAppDefinition[] = [
  { id: "ontology", name: "Ontology", repository: "Ontology", description: "Ontology explorer and visualizer.", types: ["EcosystemApp", "GraphView"], features: ["Ontology exploration", "Claim builder", "Graph visualization"] },
  { id: "atlas", name: "Atlas", repository: "atlas", description: "Community and team organization application.", types: ["EcosystemApp", "Community"], features: ["Community organization", "Engagement"] },
  { id: "fee-proxy-template", name: "Fee Proxy Template", repository: "Fee-Proxy-Template", description: "Fee collection proxy for MultiVault.", types: ["EcosystemApp", "FeePolicy", "Vault"], features: ["Fee collection", "MultiVault integration"] },
  { id: "sofia-fee-proxy-dashboard", name: "Sofia Fee Proxy Dashboard", repository: "Sofia-Fee-Proxy-Dashboard", description: "Dashboard for fee proxy management.", types: ["EcosystemApp", "FeePolicy", "Vault"], features: ["Fee proxy management", "Vault dashboard"] },
  { id: "community-directory", name: "Community Directory", repository: "community-directory", description: "Community member directory.", types: ["EcosystemApp", "Community", "Agent"], features: ["Member discovery", "Community directory"] },
  { id: "spread-trust", name: "Spread Trust", repository: "spread-trust", description: "Trust propagation tool.", types: ["EcosystemApp", "TrustSignal"], features: ["Trust propagation"] },
  { id: "l3-node", name: "L3 Node", repository: "l3-node", description: "L3 node infrastructure.", types: ["EcosystemApp", "InfrastructureNode"], features: ["L3 infrastructure"] },
  { id: "rpc", name: "RPC", repository: "RPC", description: "RPC endpoint tooling.", types: ["EcosystemApp", "RpcEndpoint"], features: ["RPC endpoint tooling"] },
  { id: "mcp-inspector", name: "MCP Inspector", repository: "mcp-inspector", description: "MCP server inspector.", types: ["EcosystemApp", "McpServer"], features: ["MCP inspection"] },
  { id: "9atunments", name: "9atunments", repository: "9atunments", description: "Intuition ecosystem application.", types: ["EcosystemApp"], features: [] },
  { id: "agent-id", name: "AgentId", repository: "agentId", description: "Agent identity system.", types: ["EcosystemApp", "Agent", "TrustSignal"], features: ["Agent identity", "Reputation"] },
  { id: "orbyt", name: "Orbyt", repository: "orbyt", description: "Intuition ecosystem application.", types: ["EcosystemApp"], features: [] },
  { id: "intuition-ideation", name: "Intuition Ideation", repository: "Intuition-ideation-skill", description: "Ideation workflow skill.", types: ["EcosystemApp", "IdeationWorkflow"], features: ["Idea refinement", "Proposal workflow"] },
  { id: "graph", name: "Graph", repository: "graph.intuition.box", description: "Trust graph visualization.", types: ["EcosystemApp", "GraphView", "TrustSignal"], features: ["Trust graph visualization"] },
  { id: "values", name: "Values", repository: "Values", description: "Organization values tool.", types: ["EcosystemApp", "OrganizationValue"], features: ["Values discovery"] },
];

const atomValue = (kind: string, value: string): string => `intuition-box:${kind}:${value}`;

function assertNonEmpty(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} must not be empty`);
}

export function validateOntologyCatalog(): void {
  const types = new Set(atomTypeDefinitions.map(({ id }) => id));
  const predicates = new Set(predicateDefinitions.map(({ id }) => id));
  const appIds = new Set<string>();

  for (const app of ecosystemApps) {
    assertNonEmpty(app.id, "app.id");
    assertNonEmpty(app.name, "app.name");
    assertNonEmpty(app.repository, "app.repository");
    assertNonEmpty(app.description, "app.description");
    if (appIds.has(app.id)) throw new Error(`Duplicate ecosystem app id: ${app.id}`);
    appIds.add(app.id);
    for (const type of app.types) {
      if (!types.has(type)) throw new Error(`Unknown atom type "${type}" in ${app.id}`);
    }
  }

  for (const rule of relationshipRules) {
    if (!types.has(rule.subject) || !types.has(rule.object)) throw new Error("Relationship rule uses an unknown atom type");
    if (!predicates.has(rule.predicate)) throw new Error(`Unknown predicate "${rule.predicate}"`);
  }
}

export function buildOntologyAtoms(): OntologyAtom[] {
  validateOntologyCatalog();
  const atoms = new Map<string, OntologyAtom>();
  const add = (key: string, value: string) => atoms.set(key, { key, value });

  for (const type of atomTypeDefinitions) add(`type:${type.id}`, atomValue("type", type.id));
  for (const predicate of predicateDefinitions) add(`predicate:${predicate.id}`, atomValue("predicate", predicate.id));

  for (const app of ecosystemApps) {
    add(`app:${app.id}`, atomValue("app", app.id));
    add(`repo:${app.id}`, atomValue("repository", app.repository));
    for (const feature of app.features) add(`feature:${app.id}:${feature}`, atomValue("feature", feature));
  }

  return [...atoms.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export function buildOntologyTriples(): OntologyTriple[] {
  validateOntologyCatalog();
  const triples: OntologyTriple[] = [];
  const typePredicate = atomValue("predicate", "hasType");

  for (const app of ecosystemApps) {
    const appAtom = atomValue("app", app.id);
    triples.push({ subject: appAtom, predicate: typePredicate, object: atomValue("type", "EcosystemApp") });
    triples.push({ subject: appAtom, predicate: atomValue("predicate", "hasRepository"), object: atomValue("repository", app.repository) });

    for (const type of app.types.filter((type) => type !== "EcosystemApp")) {
      triples.push({ subject: appAtom, predicate: typePredicate, object: atomValue("type", type) });
    }

    for (const feature of app.features) {
      triples.push({ subject: appAtom, predicate: atomValue("predicate", "hasFeature"), object: atomValue("feature", feature) });
    }
  }

  for (const rule of relationshipRules) {
    const ruleAtom = atomValue("relationship-rule", `${rule.subject}-${rule.predicate}-${rule.object}`);
    triples.push({ subject: ruleAtom, predicate: atomValue("predicate", "hasType"), object: atomValue("type", "Feature") });
    triples.push({ subject: ruleAtom, predicate: atomValue("predicate", "represents"), object: atomValue("type", rule.subject) });
    triples.push({ subject: ruleAtom, predicate: atomValue("predicate", rule.predicate), object: atomValue("type", rule.object) });
  }

  return triples.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

export async function publishEcosystemOntology(client: OnchainOntologyClient): Promise<PublicationReceipt> {
  const atoms = buildOntologyAtoms();
  const triples = buildOntologyTriples();
  const receipts: Record<string, OnchainReceipt> = {};

  for (const atom of atoms) {
    receipts[atom.value] = await client.createOrResolveAtom(atom.value);
    if (!receipts[atom.value]?.id || !receipts[atom.value]?.transactionHash) {
      throw new Error(`Onchain client returned an incomplete atom receipt for ${atom.value}`);
    }
  }

  const tripleReceipts: OnchainReceipt[] = [];
  for (const triple of triples) {
    const receipt = await client.createOrResolveTriple({
      subjectAtomId: receipts[triple.subject]?.id,
      predicateAtomId: receipts[triple.predicate]?.id,
      objectAtomId: receipts[triple.object]?.id,
    });
    if (!receipt?.id || !receipt.transactionHash) {
      throw new Error(`Onchain client returned an incomplete triple receipt for ${JSON.stringify(triple)}`);
    }
    tripleReceipts.push(receipt);
  }

  return { atoms: receipts, triples: tripleReceipts };
}
