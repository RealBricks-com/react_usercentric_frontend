import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Phone, Mail, User, DollarSign } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { LeadCreateDto } from '@/types/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: number;
  projectName?: string;
  developerId?: number;
}

const EnquiryModal = ({ isOpen, onClose, projectId, projectName, developerId }: EnquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budgetMin: '',
    budgetMax: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiryData: LeadCreateDto = {
        projectId,
        developerId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : undefined,
        budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : undefined,
      };

      const response = await api.sendEnquiry(enquiryData);

      if (response.status) {
        toast({
          title: "Enquiry Sent Successfully!",
          description: "Thank you for your interest. Our team will contact you soon.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          budgetMin: '',
          budgetMax: '',
          message: ''
        });
        
        onClose();
      } else {
        throw new Error(response.message || 'Failed to send enquiry');
      }
    } catch (error) {
      console.error('Enquiry submission failed:', error);
      
      let errorMessage = 'Failed to send enquiry. Please try again.';
      if (error instanceof ApiError) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Send Enquiry
          </DialogTitle>
          {projectName && (
            <p className="text-sm text-muted-foreground">
              For: <span className="font-medium">{projectName}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Min Budget
              </Label>
              <Input
                id="budgetMin"
                type="number"
                value={formData.budgetMin}
                onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                placeholder="₹ Minimum"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMax">Max Budget</Label>
              <Input
                id="budgetMax"
                type="number"
                value={formData.budgetMax}
                onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                placeholder="₹ Maximum"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Any specific requirements or questions..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="premium"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Enquiry
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground text-center pt-2">
          By submitting, you agree to be contacted by our team regarding this property.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;