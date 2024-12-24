'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// This would typically come from an API or database
const assets = [
  { id: 1, name: "Standard Casket", description: "A dignified wooden casket.", rate: "$1,000", quantity: 10 },
  { id: 2, name: "Premium Casket", description: "A high-quality, ornate casket.", rate: "$2,500", quantity: 5 },
  { id: 3, name: "Urn", description: "A respectful container for ashes.", rate: "$200", quantity: 20 },
  { id: 4, name: "Flower Arrangement", description: "Beautiful floral tribute.", rate: "$150", quantity: 15 },
  { id: 5, name: "Memorial Book", description: "A book for attendees to sign.", rate: "$50", quantity: 30 },
]

export default function AssetsListing() {
  const [reservedAssets, setReservedAssets] = useState<{[key: number]: number}>({})

  const handleReservation = (assetId: number, quantity: number) => {
    setReservedAssets(prev => ({...prev, [assetId]: (prev[assetId] || 0) + quantity}))
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Assets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id}>
              <CardHeader>
                <CardTitle>{asset.name}</CardTitle>
                <CardDescription>{asset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{asset.rate}</p>
                <p className="mt-2">Available: {asset.quantity - (reservedAssets[asset.id] || 0)}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-end gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor={`quantity-${asset.id}`}>Quantity</Label>
                    <Input 
                      type="number" 
                      id={`quantity-${asset.id}`} 
                      defaultValue="1"
                      min="1"
                      max={asset.quantity - (reservedAssets[asset.id] || 0)}
                    />
                  </div>
                  <Button 
                    onClick={() => handleReservation(asset.id, 1)}
                    disabled={asset.quantity - (reservedAssets[asset.id] || 0) === 0}
                  >
                    Reserve
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

