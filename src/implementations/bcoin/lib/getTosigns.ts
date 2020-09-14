import { BcoinTransactionInfo } from './getTx';
import axios from 'axios';

// TODO: put in a library
class Client {
  static async invoke(apiCall: string, parameters: object): Promise<object> {
    try {
      const res = await axios.post(`${process.env.BCOIN_URL}/${apiCall}`, parameters, {
        auth: { username: 'x', password: process.env.BCOIN_PASSWORD || '' },
      });
      return res.data
      // if (res.data) {
      //   const rawTx = res.data as string
      //   console.log(rawTx)
      // } else throw 'Empty body';
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // TODO: handle 404
        return {}
      } else throw error;
    }

  }
}

export async function getTosigns(_tx: BcoinTransactionInfo): Promise<string[]> {
  // TODO: Get strings that are ready to be signed from the transaction.
  // Unsigned transaction object looks like this: https://bcoin.io/api-docs/index.html#create-a-transaction
  // This should be analogous to the tosigns in the blockcypher API https://www.blockcypher.com/dev/bitcoin/#creating-transactions

  // API createrawtransaction
  let rawTxRequest = {
    outpoints: _tx.inputs.map((input, index) => ({
      txid: input.prevout.hash,
      vout: input.prevout.index,
      // sequence: index,
    })),
    sendto: _tx.outputs.map(output => ({
      [output.address]: output.value,
      data: "",
    })),
  }

  // TODO: factor out common bcoin API calls code
  // try {
  //   const res = await axios.post(`${process.env.BCOIN_URL}/createrawtransaction`, rawTxRequest, {
  //     auth: { username: 'x', password: process.env.BCOIN_PASSWORD || '' },
  //   });
  //   if (res.data) {
  //     const rawTx = res.data as string
  //     console.log(rawTx)
  //   } else throw 'Empty body';
  // } catch (error) {
  //   if (error.response && error.response.status === 404) {
  //     // TODO: handle 404
  //   } else throw error;
  // }

  const rawTx = await Client.invoke("createrawtransaction", [rawTxRequest.outpoints, rawTxRequest.sendto])
  const decodedTx = await Client.invoke("decoderawtransaction", [rawTx])

  // Now what remains to be done is to encode UTXO to strings and return it.
  // It would be better to have a special type instead of string.


  // 1	outpoints	Required	Outpoint list
  // 1.1	txid		Transaction Hash
  // 1.2	vout		Transaction Outpoint Index
  // 1.3	sequence		Sequence number for input
  // 2	sendto	Required	List of addresses with amounts that we are sending to.
  // 2.1	address	0	address: amount key pairs (string: float)
  // 2.2	data	nullData	Data output (added as OP_RETURN)
  // 3	locktime		earliest time a transaction can be added

  return [];
}
