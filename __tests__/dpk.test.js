import { DeterministicPartitionKey } from "../dpk.js";

describe("deterministicPartitionKey", () => {
  const deterministicPartitionKey = new DeterministicPartitionKey();

  it("Returns the literal '0' when given no input", () => {
    const candidate = deterministicPartitionKey.getCandidate();
    expect(candidate).toBe("0");
  });

  it("Returns the literal 'lorem ipsum dolor sit' when given a 'partitionKey' value", () => {
    const candidate = deterministicPartitionKey.getCandidate({
      partitionKey: "lorem ipsum dolor sit"
    });

    expect(candidate).toBe("lorem ipsum dolor sit");
  });

  it("Returns a new Hash when given an event without 'partitionKey'", () => {
    const candidate = deterministicPartitionKey.getCandidate({
      name: "Jhon",
      lastName: "Doe",
    });

    expect(candidate.length).toBe(128);
  });

  it("Given a 'partitionKey' with length > 256, Create a new partitionKey", () => {
    const partitionKey = "fd5a571a7f2ef968172f4ba3c7cd75d0eb04b2dce1e2fa5731b391a780d728307e18e2f3a89e8d669222c08a79a858ae8df19e106bd50a6bfa6196ad239535b4fd5a571a7f2ef968172f4ba3c7cd75d0eb04b2dce1e2fa5731b391a780d728307e18e2f3a89e8d669222c08a79a858ae8df19e106bd50a6bfa6196ad239535b41";
    const candidate = deterministicPartitionKey.getCandidate({ partitionKey });

    expect(candidate).not.toBe(partitionKey);
  });

  it("Given an stringified valid object, return the same", () => {
    const candidate = deterministicPartitionKey.checkCandidateExists('{"partitionKey":"lorem ipsum dolor sit"}');

    expect(candidate).toBe('{"partitionKey":"lorem ipsum dolor sit"}');
  });

  it("Update a Hash", () => {
    const hash = "0d5de945b779afc23da7798a56316068489e21bdcf1f98b47da0a92e2cbb2cc3482a405a4c8801082544e215672011095f81382ffc3324bd0afad35350e601c6";
    const candidate = deterministicPartitionKey.updateCandidate('{"partitionKey":"lorem ipsum dolor sit"}');

    expect(candidate).not.toBe(hash);
  });
});
