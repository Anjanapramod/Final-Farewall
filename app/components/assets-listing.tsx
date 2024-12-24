'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { getAssetByFuneralParlorId } from '../store/slices/assetSlice'

// This would typically come from an API or database


export default function AssetsListing() {

  const params = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { assets } = useSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatch(getAssetByFuneralParlorId(Number(params.id)));
  }, [dispatch, params.id]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Assets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets && assets.map((asset) => (
            <Card key={asset.id}>
              <CardHeader>
                <CardTitle>{asset.name}</CardTitle>
                <CardDescription>{asset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{asset.rate}</p>
                <p className="mt-2">Available: </p>
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
                    />
                  </div>
                  <Button
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

