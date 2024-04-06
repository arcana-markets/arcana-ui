import * as web3 from "@solana/web3.js";
import * as spl from '@solana/spl-token';
import * as anchor from "@coral-xyz/anchor";
import { ArcanaVaults } from "./arcana_vaults";

const program = anchor.workspace.ArcanaVaults as anchor.Program<ArcanaVaults>;
const provider = anchor.AnchorProvider.env()
const connection = provider.connection;


export function findPda(seeds: Array<Buffer | Uint8Array>) {
	// return [publicKey, bump]
	return web3.PublicKey.findProgramAddressSync(seeds, program.programId)[0];
}


export async function createNewToken(payer: web3.Keypair, ui_amount: number) {
	const mintAuthority = web3.Keypair.generate();
	const freezeAuthority = web3.Keypair.generate();

	const mint = await spl.createMint(
		connection,
		payer,
		mintAuthority.publicKey,
		freezeAuthority.publicKey,
		9 // decimal
	);
	// console.log(mint.toBase58());


	const mintInfo = await spl.getMint(
		connection,
		mint
	)
	// console.log(mintInfo.supply);


	const tokenAccount = await spl.getOrCreateAssociatedTokenAccount(
		connection,
		payer,
		mint,
		payer.publicKey
	)
	// console.log(tokenAccount.address.toBase58());


	const tokenAccountInfo = await spl.getAccount(
		connection,
		tokenAccount.address
	)
	// console.log(tokenAccountInfo.amount);
	// 0

	await spl.mintTo(
		connection,
		payer,
		mint,
		tokenAccount.address,
		mintAuthority,
		web3.LAMPORTS_PER_SOL * ui_amount // because decimals for the mint are set to 9
	)

	const mintInfo2 = await spl.getMint(
		connection,
		mint
	)

	// console.log(mintInfo2.supply);
	// 100

	const tokenAccountInfo2 = await spl.getAccount(
		connection,
		tokenAccount.address
	)
	// console.log(tokenAccountInfo2.amount);
	// 100

	return mint
}