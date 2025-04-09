import { StudentData } from "@/types";

const STORAGE_KEY = "student_id_cards";

// Get all saved cards from localStorage
export const getSavedCards = (): StudentData[] => {
  try {
    const savedCardsJson = localStorage.getItem(STORAGE_KEY);
    if (!savedCardsJson) return [];
    
    const savedCards = JSON.parse(savedCardsJson);
    return Array.isArray(savedCards) ? savedCards : [];
  } catch (error) {
    console.error("Error retrieving saved cards:", error);
    return [];
  }
};

// Save a new card to localStorage
export const saveCard = (card: StudentData): void => {
  try {
    const savedCards = getSavedCards();
    
    // Check if card with same roll number exists
    const existingIndex = savedCards.findIndex(
      (c) => c.rollNumber === card.rollNumber
    );
    
    if (existingIndex !== -1) {
      // Update existing card
      savedCards[existingIndex] = card;
    } else {
      // Add new card
      savedCards.unshift(card);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCards));
  } catch (error) {
    console.error("Error saving card:", error);
  }
};

// Delete a card from localStorage
export const deleteCard = (rollNumber: string): void => {
  try {
    const savedCards = getSavedCards();
    const updatedCards = savedCards.filter(
      (card) => card.rollNumber !== rollNumber
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Error deleting card:", error);
  }
};
