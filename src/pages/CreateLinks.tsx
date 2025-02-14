
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";

interface GeneratedLink {
  id: string;
  destinationUrl: string;
  shortUrl: string;
  createdAt: Date;
}

const PREDEFINED_URLS = [
  { label: "flinbo.com", value: "https://flinbo.com" },
  { label: "flinbo.com/register", value: "https://flinbo.com/register" },
];

const CreateLinks = () => {
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [selectedPredefined, setSelectedPredefined] = useState("");

  const generateShortUrl = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'short.ly/';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateLink = () => {
    const destinationUrl = selectedPredefined || customUrl;
    
    if (!destinationUrl) {
      toast.error("Please select or enter a destination URL");
      return;
    }

    const newLink: GeneratedLink = {
      id: Math.random().toString(36).substr(2, 9),
      destinationUrl,
      shortUrl: generateShortUrl(),
      createdAt: new Date(),
    };

    setGeneratedLinks(prev => [newLink, ...prev]);
    toast.success("Link generated successfully!");
    
    if (!selectedPredefined) {
      setCustomUrl("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-2 text-center animate-fade-up">
          <div className="inline-block rounded-full bg-gray-900 px-3 py-1 text-sm text-white mb-4">
            Link Generator
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Create Affiliate Links
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate and manage your affiliate links easily.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto space-y-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg border p-6 space-y-4">
            <div className="space-y-4">
              <Select onValueChange={setSelectedPredefined} value={selectedPredefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination URL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Custom URL</SelectItem>
                  {PREDEFINED_URLS.map((url) => (
                    <SelectItem key={url.value} value={url.value}>
                      {url.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!selectedPredefined && (
                <Input
                  type="url"
                  placeholder="Enter custom destination URL"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              )}

              <Button onClick={handleCreateLink} className="w-full">
                Generate Link
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedLinks.map((link) => (
              <div
                key={link.id}
                className="bg-white/50 backdrop-blur-sm rounded-lg border p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {format(link.createdAt, "MMM d, yyyy HH:mm")}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-mono break-all">
                    {link.destinationUrl}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 block bg-gray-50 rounded px-2 py-1 text-sm font-mono text-blue-600">
                      {link.shortUrl}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(link.shortUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLinks;
