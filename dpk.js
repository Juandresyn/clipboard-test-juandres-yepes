import crypto from "crypto";
import { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } from "./constants.js";

export class DeterministicPartitionKey {
  constructor() {
    this.candidate = null;
  }

  /**
   * This method extracts a candidate from a given event.
   * If the partitionKey parameter is not provided creates a new Hash partitionKey.
   * @param {*} event - The event to extract the candidate from.
   * @returns string
   */
  extractCandidateFromEvent(event) {
    if (event.partitionKey) {
      return event.partitionKey;
    }

    const data = JSON.stringify(event);

    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  /**
   * This method checks if a given candidate hash exists and if it is not an string
   * uses JSON.stringify to turn it into a string.
   * @param {*} candidate - The candidate hash to check.
   * @returns string
   */
  checkCandidateExists(candidate = null) {
    if (candidate && typeof candidate !== "string") {
      return JSON.stringify(candidate);
    }

    return candidate;
  }

  /**
   * This method updates a hash with a given candidate object.
   * @param {*} candidate - the candidate hash to update.
   * @returns string
   */
  updateCandidate(candidate) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  /**
   * This method gets a candidate out of an event and transforms it to a string or creates it
   * if it doesn't exist already.
   * @param {*} event - The event to get the candidate from
   * @returns string
   */
  getCandidate(event = null) {
    if (event) {
      this.candidate = this.extractCandidateFromEvent(event);
    }

    this.candidate = this.candidate ? this.checkCandidateExists(this.candidate) : TRIVIAL_PARTITION_KEY;

    if (this.candidate.length > MAX_PARTITION_KEY_LENGTH) {
      this.candidate = this.updateCandidate(this.candidate);
    }

    return this.candidate;
  }
};
