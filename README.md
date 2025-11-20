# Wish Cipher Draw - Encrypted Lottery System

A fully homomorphic encryption (FHE) based lottery system built on FHEVM that enables privacy-preserving random draws while maintaining complete confidentiality of participant numbers.

## 🎯 Live Demo

Experience the encrypted lottery system live: [https://wish-cipher-draw.vercel.app/](https://wish-cipher-draw.vercel.app/)

## 🎬 Demo Video

Watch the full demonstration: [https://github.com/OdeletteKennedy/wish-cipher-draw/blob/main/wish-cipher-draw.mp4](https://github.com/OdeletteKennedy/wish-cipher-draw/blob/main/wish-cipher-draw.mp4)

## ✨ Features

- **Privacy-First Design**: All participant numbers remain encrypted throughout the lottery process
- **Homomorphic Encryption**: Winner selection performed on encrypted data without decryption
- **Decentralized Randomness**: FHE-based random number generation ensures fairness
- **Multi-Participant Support**: Configurable maximum participant limits per lottery
- **Real-time Updates**: Live tracking of lottery status and participant registration
- **Secure Winner Selection**: Encrypted winner drawing with automatic decryption upon completion

## 🏗️ Architecture

### Smart Contract Overview

The system consists of a single main contract `FHELottery.sol` that implements the complete encrypted lottery functionality.

#### Core Data Structures

```solidity
struct Lottery {
    uint256 id;
    address creator;
    address winner;
    string name;
    uint256 maxParticipants;
    uint256 participantCount;
    bool isActive;
    bool isDrawn;
    euint32 winningNumber;        // Encrypted winning number
    mapping(address => bool) participants;
    mapping(address => euint32) encryptedNumbers;    // Encrypted participant numbers
    mapping(address => uint256) participantNumbers;  // Plaintext numbers (for reference)
}
```

### Key Encryption/Decryption Logic

#### 1. Participant Registration with Encrypted Numbers

```solidity
function registerParticipant(
    uint256 _lotteryId,
    externalEuint32 _encryptedNumber,
    bytes calldata _inputProof
) external {
    // Convert external encrypted input to internal FHE type
    euint32 encryptedNumber = FHE.fromExternal(_encryptedNumber, _inputProof);

    // Store encrypted number for the participant
    lottery.encryptedNumbers[msg.sender] = encryptedNumber;

    // Grant decryption permissions
    FHE.allowThis(encryptedNumber);
    FHE.allow(encryptedNumber, msg.sender);

    emit ParticipantRegistered(_lotteryId, msg.sender, encryptedNumber);
}
```

**Encryption Flow:**
1. User encrypts their chosen number on the frontend using FHE.js
2. Encrypted number is submitted to the contract with zero-knowledge proof
3. Contract stores the encrypted value without ever seeing the plaintext
4. Decryption permissions are granted to the user for later verification

#### 2. Winner Selection with Homomorphic Operations

```solidity
function drawWinner(uint256 _lotteryId) external {
    // Generate encrypted random number bounded by participant count
    euint32 randomEncryptedNumber = FHE.randBounded(
        uint32(lottery.participantCount),
        FHE.Euint32
    );

    // Store encrypted winning number
    lottery.winningNumber = randomEncryptedNumber;

    // Grant decryption permissions to lottery creator
    FHE.allowThis(lottery.winningNumber);
    FHE.allow(lottery.winningNumber, msg.sender);

    emit WinnerDrawn(_lotteryId, randomEncryptedNumber);
}
```

**Homomorphic Random Selection:**
1. Generate an encrypted random number using `FHE.randBounded()`
2. The random number represents the winning participant index
3. All operations happen on encrypted data - no decryption occurs during selection
4. Only the final result can be decrypted by authorized parties

#### 3. Privacy-Preserving Winner Determination

The system uses index-based winner selection where:
- Random number corresponds to participant position (1 to participantCount)
- Winner identity remains encrypted until explicitly revealed
- No intermediate decryption compromises privacy
- Final decryption only reveals the winner, not individual participant numbers

## 🚀 Installation & Setup

### Prerequisites

- Node.js >= 20.0.0
- npm >= 7.0.0
- Git

### Clone and Install

```bash
git clone https://github.com/OdeletteKennedy/wish-cipher-draw.git
cd wish-cipher-draw
npm install
```

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy to Sepolia Testnet

```bash
# Configure your environment variables
cp .env.example .env
# Edit .env with your private key and RPC URLs

# Deploy contracts
npx hardhat run scripts/deploy.ts --network sepolia
```

## 🎮 Usage

### Creating a Lottery

```solidity
// Create a new lottery with name and max participants
uint256 lotteryId = lotteryContract.createLottery("Summer Draw", 100);
```

### Participating in a Lottery

```javascript
// Frontend encryption and registration
const encryptedNumber = await fhe.encrypt32(42); // User's chosen number
await lotteryContract.registerParticipant(lotteryId, encryptedNumber, proof);
```

### Drawing Winner

```solidity
// Lottery creator draws winner
await lotteryContract.drawWinner(lotteryId);

// Get encrypted winning number
const winningNumber = await lotteryContract.getWinningNumber(lotteryId);
```

## 🔐 Security Features

- **Zero-Knowledge Proofs**: All encrypted inputs include validity proofs
- **Permissioned Decryption**: Only authorized parties can decrypt specific values
- **Homomorphic Operations**: All computations on encrypted data
- **Replay Protection**: Each participant can only register once per lottery
- **Access Control**: Only lottery creators can initiate winner draws

## 🛠️ Technical Stack

- **Blockchain**: FHEVM (Fully Homomorphic Encryption Virtual Machine)
- **Encryption**: Zama FHE Library
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Hardhat + Solidity
- **Deployment**: Vercel (Frontend) + Sepolia Testnet (Contracts)

## 📁 Project Structure

```
wish-cipher-draw/
├── contracts/           # Solidity smart contracts
│   └── FHELottery.sol  # Main lottery contract
├── ui/                  # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── lib/         # Contract interaction utilities
│   │   └── pages/       # Main application pages
├── test/                # Contract test suites
├── deploy/              # Deployment scripts
└── tasks/               # Hardhat tasks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama FHE Library](https://docs.zama.ai/fhevm/fhe-library)
- [Live Demo](https://wish-cipher-draw.vercel.app/)
- [Demo Video](https://github.com/OdeletteKennedy/wish-cipher-draw/blob/main/wish-cipher-draw.mp4)
