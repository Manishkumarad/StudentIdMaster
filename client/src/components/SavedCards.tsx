import { StudentData } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/lib/localStorageUtils";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";

interface SavedCardsProps {
  visible: boolean;
  savedCards: StudentData[];
  setSavedCards: (cards: StudentData[]) => void;
  setFormData: (data: StudentData) => void;
  setHasSubmitted?: (value: boolean) => void;
}

const SavedCards = ({
  visible,
  savedCards,
  setSavedCards,
  setFormData,
  setHasSubmitted,
}: SavedCardsProps) => {
  const { toast } = useToast();

  if (!visible) return null;

  const handleLoadSavedCard = (card: StudentData) => {
    setFormData(card);
    
    // Set hasSubmitted to true if the callback is provided
    // This ensures the card preview is displayed immediately
    if (setHasSubmitted) {
      console.log("Setting hasSubmitted to true from SavedCards");
      setHasSubmitted(true);
    }
    
    toast({
      title: "Card loaded",
      description: "The saved card has been loaded and ready to view or edit",
    });
  };

  const handleDeleteSavedCard = (index: number, rollNumber: string) => {
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);
    
    // Remove from localStorage
    deleteCard(rollNumber);
    
    toast({
      title: "Card deleted",
      description: "The saved card has been deleted",
    });
  };

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved ID Cards</h2>

      {savedCards.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No saved cards yet. Generate an ID card to see it here.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedCards.map((card, index) => (
            <Card key={`${card.rollNumber}-${index}`} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <CardHeader className="p-3 bg-blue-50 flex flex-row items-center justify-between">
                <h3 className="font-medium text-blue-800">{card.name}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadSavedCard(card)}
                    className="p-1 text-blue-600 hover:text-blue-800 h-auto"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSavedCard(index, card.rollNumber)}
                    className="p-1 text-red-600 hover:text-red-800 h-auto"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 text-sm text-gray-600 bg-white">
                <p>Roll Number: {card.rollNumber}</p>
                <p>Class: {card.classDiv}</p>
                <p>Created: {formatDate(card.timestamp)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCards;
