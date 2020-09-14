import { PartialTransaction, FullTransaction } from '../../../types';

export async function combineTxSigs(_partialTx: PartialTransaction, _signatures: string[], _publicKeys: string[], _signerPublicKey: string): Promise<FullTransaction> {
  // TODO: Implement
  // Takes the signatures of the tosigns created by the 'getTosigns" method and the transaction template
  // to create a complete transaction that is ready to be sent to the network
  // signatures will be delivered as DER in hex
  // public keys can be delivered in 33 byte compressed, 65-byte hybrid or 65-byte uncompressed format (choose one)
  return {};
}
