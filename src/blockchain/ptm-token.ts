import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer
} from '@solana/spl-token'

// PTM Token Mint (would be a real address in production)
const PTM_TOKEN_MINT = process.env.NEXT_PUBLIC_PTM_TOKEN_MINT_ADDRESS || 'placeholder_token_mint_address'

// Initialize a connection to Solana
export const initConnection = (network: string = 'devnet') => {
  const endpoint = getNetworkEndpoint(network)
  return new Connection(endpoint, 'confirmed')
}

// Get network endpoint based on environment
export const getNetworkEndpoint = (network: string): string => {
  switch (network) {
    case 'mainnet-beta':
      return process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com'
    case 'testnet':
      return 'https://api.testnet.solana.com'
    case 'devnet':
    default:
      return 'https://api.devnet.solana.com'
  }
}

// Get PTM token mint
export const getPTMTokenMint = () => {
  return new PublicKey(PTM_TOKEN_MINT)
}

// Check if a wallet has a PTM token account
export const hasPTMTokenAccount = async (
  connection: Connection,
  walletAddress: string
): Promise<boolean> => {
  try {
    const walletPublicKey = new PublicKey(walletAddress)
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { mint: getPTMTokenMint() }
    )
    return tokenAccounts.value.length > 0
  } catch (error) {
    console.error('Error checking PTM token account:', error)
    return false
  }
}

// Get a wallet's PTM token balance
export const getPTMBalance = async (
  connection: Connection,
  walletAddress: string
): Promise<number> => {
  try {
    const walletPublicKey = new PublicKey(walletAddress)
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { mint: getPTMTokenMint() }
    )
    
    if (tokenAccounts.value.length === 0) {
      return 0
    }
    
    // Get the balance from the first token account found
    return tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
  } catch (error) {
    console.error('Error getting PTM balance:', error)
    return 0
  }
}

// Award PTM tokens to a player based on game achievements
export const awardPTMTokens = async (
  connection: Connection,
  rewardWalletKeypair: Keypair,
  playerAddress: string,
  amount: number,
  reason: string
): Promise<string | null> => {
  try {
    const playerPublicKey = new PublicKey(playerAddress)
    const tokenMint = getPTMTokenMint()
    
    // Get or create the reward wallet's token account
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      rewardWalletKeypair,
      tokenMint,
      rewardWalletKeypair.publicKey
    )
    
    // Get or create the player's token account
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      rewardWalletKeypair, // Payer for the transaction
      tokenMint,
      playerPublicKey
    )
    
    // Calculate the token amount (assuming 9 decimals)
    const tokenAmount = amount * Math.pow(10, 9)
    
    // Transfer tokens from reward wallet to player
    const signature = await transfer(
      connection,
      rewardWalletKeypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      rewardWalletKeypair, // Authority
      tokenAmount
    )
    
    console.log(`Awarded ${amount} PTM to ${playerAddress} for ${reason}. Signature: ${signature}`)
    return signature
  } catch (error) {
    console.error('Error awarding PTM tokens:', error)
    return null
  }
}

// Helper function to create a transaction to transfer PTM tokens
export const createPTMTransferTransaction = async (
  connection: Connection,
  fromWalletPublicKey: PublicKey,
  toWalletPublicKey: PublicKey,
  amount: number
): Promise<Transaction | null> => {
  try {
    const tokenMint = getPTMTokenMint()
    
    // Find the sender's token account
    const fromTokenAccountInfo = await connection.getParsedTokenAccountsByOwner(
      fromWalletPublicKey,
      { mint: tokenMint }
    )
    
    if (fromTokenAccountInfo.value.length === 0) {
      throw new Error('Sender has no PTM token account')
    }
    
    // Find or create the recipient's token account
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      // In a real implementation, we would need a keypair here
      Keypair.generate(), // This is just a placeholder
      tokenMint,
      toWalletPublicKey
    )
    
    // Create a new transaction object
    const transaction = new Transaction()
    
    // Calculate the token amount (assuming 9 decimals)
    const tokenAmount = amount * Math.pow(10, 9)
    
    // Add transfer instruction to transaction
    transaction.add(
      transfer(
        connection,
        Keypair.generate(), // This is just a placeholder
        fromTokenAccountInfo.value[0].pubkey,
        toTokenAccount.address,
        fromWalletPublicKey,
        tokenAmount
      )
    )
    
    return transaction
  } catch (error) {
    console.error('Error creating PTM transfer transaction:', error)
    return null
  }
} 