import { DeterministicPartitionKey } from "./dpk.js";

const deterministicPartitionKey = new DeterministicPartitionKey();

console.log('deterministicPartitionKey:', deterministicPartitionKey.getCandidate({ name: "juandres" }));