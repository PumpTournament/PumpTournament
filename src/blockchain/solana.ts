import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token'

// Connect to Solana network
export const connectToSolana = (network: 'mainnet-beta' | 'devnet' | 'testnet' = 'devnet') => {
  const endpoint = getEndpoint(network)
  return new Connection(endpoint, 'confirmed')
}

// Get network endpoint
export const getEndpoint = (network: 'mainnet-beta' | 'devnet' | 'testnet'): string => {
  switch (network) {
    case 'mainnet-beta':
      return 'https://api.mainnet-beta.solana.com'
    case 'devnet':
      return 'https://api.devnet.solana.com'
    case 'testnet':
      return 'https://api.testnet.solana.com'
    default:
      return 'https://api.devnet.solana.com'
  }
}

// Connect wallet
export const connectWallet = async () => {
  if (typeof window !== 'undefined' && 'solana' in window) {
    const solana = (window as any).solana
    try {
      const response = await solana.connect()
      console.log('Wallet connected with public key:', response.publicKey.toString())
      return response.publicKey.toString()
    } catch (error) {
      console.error('Error connecting to wallet:', error)
      throw error
    }
  } else {
    console.error('Solana wallet adapter not found!')
    throw new Error('Solana wallet adapter not found! Please install Phantom or Solflare extension.')
  }
}

// Disconnect wallet
export const disconnectWallet = async () => {
  if (typeof window !== 'undefined' && 'solana' in window) {
    const solana = (window as any).solana
    try {
      await solana.disconnect()
      console.log('Wallet disconnected')
      return true
    } catch (error) {
      console.error('Error disconnecting from wallet:', error)
      throw error
    }
  }
}

// Check if wallet is connected
export const isWalletConnected = async () => {
  if (typeof window !== 'undefined' && 'solana' in window) {
    const solana = (window as any).solana
    try {
      return solana.isConnected
    } catch (error) {
      console.error('Error checking wallet connection:', error)
      return false
    }
  }
  return false
}

// Get PTM token balance
export const getPTMBalance = async (
  connection: Connection, 
  walletAddress: string, 
  tokenMintAddress: string
) => {
  try {
    const walletPublicKey = new PublicKey(walletAddress)
    const tokenMintPublicKey = new PublicKey(tokenMintAddress)
    
    // Find token account
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { mint: tokenMintPublicKey }
    )
    
    if (tokenAccounts.value.length === 0) {
      return 0
    }
    
    // Return balance
    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
    return balance
  } catch (error) {
    console.error('Error getting token balance:', error)
    return 0
  }
}

// Send PTM rewards
export const sendPTMRewards = async (
  connection: Connection,
  senderWallet: any, // Replace with Wallet type for real implementation
  receiverAddress: string,
  tokenMintAddress: string,
  amount: number
) => {
  try {
    const receiverPublicKey = new PublicKey(receiverAddress)
    const tokenMintPublicKey = new PublicKey(tokenMintAddress)
    
    // Find sender token account
    const senderTokenAccounts = await connection.getParsedTokenAccountsByOwner(
      senderWallet.publicKey,
      { mint: tokenMintPublicKey }
    )
    
    if (senderTokenAccounts.value.length === 0) {
      throw new Error('Sender has no token account for this mint')
    }
    
    // Find or create receiver token account
    let receiverTokenAccount
    const receiverTokenAccounts = await connection.getParsedTokenAccountsByOwner(
      receiverPublicKey,
      { mint: tokenMintPublicKey }
    )
    
    if (receiverTokenAccounts.value.length > 0) {
      receiverTokenAccount = receiverTokenAccounts.value[0].pubkey
    } else {
      // In real implementation, would need to create token account for receiver
      throw new Error('Receiver has no token account for this mint')
    }
    
    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      senderTokenAccounts.value[0].pubkey,
      receiverTokenAccount,
      senderWallet.publicKey,
      amount * (10 ** 9) // Assuming 9 decimals for the token
    )
    
    // Create and send transaction
    const transaction = new Transaction().add(transferInstruction)
    const signature = await connection.sendTransaction(
      transaction,
      [senderWallet]
    )
    
    await connection.confirmTransaction(signature, 'confirmed')
    return signature
  } catch (error) {
    console.error('Error sending PTM rewards:', error)
    throw error
  }
} 