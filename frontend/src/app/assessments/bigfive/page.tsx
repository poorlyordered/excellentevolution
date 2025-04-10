'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const BigFiveSchema = z.object({
  openness: z.number(),
  openness_imagination: z.number(),
  openness_artistic: z.number(),
  openness_emotionality: z.number(),
  openness_adventurousness: z.number(),
  openness_intellect: z.number(),
  openness_liberalism: z.number(),

  conscientiousness: z.number(),
  conscientiousness_self_efficacy: z.number(),
  conscientiousness_orderliness: z.number(),
  conscientiousness_dutifulness: z.number(),
  conscientiousness_achievement: z.number(),
  conscientiousness_self_discipline: z.number(),
  conscientiousness_cautiousness: z.number(),

  extraversion: z.number(),
  extraversion_friendliness: z.number(),
  extraversion_gregariousness: z.number(),
  extraversion_assertiveness: z.number(),
  extraversion_activity: z.number(),
  extraversion_excitement: z.number(),
  extraversion_cheerfulness: z.number(),

  agreeableness: z.number(),
  agreeableness_trust: z.number(),
  agreeableness_morality: z.number(),
  agreeableness_altruism: z.number(),
  agreeableness_cooperation: z.number(),
  agreeableness_modesty: z.number(),
  agreeableness_sympathy: z.number(),

  neuroticism: z.number(),
  neuroticism_anxiety: z.number(),
  neuroticism_anger: z.number(),
  neuroticism_depression: z.number(),
  neuroticism_self_consciousness: z.number(),
  neuroticism_immoderation: z.number(),
  neuroticism_vulnerability: z.number(),
})

type BigFiveFormData = z.infer<typeof BigFiveSchema>

export default function BigFiveAssessmentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<BigFiveFormData>({
    resolver: zodResolver(BigFiveSchema),
    defaultValues: {
      openness: 0,
      openness_imagination: 0,
      openness_artistic: 0,
      openness_emotionality: 0,
      openness_adventurousness: 0,
      openness_intellect: 0,
      openness_liberalism: 0,

      conscientiousness: 0,
      conscientiousness_self_efficacy: 0,
      conscientiousness_orderliness: 0,
      conscientiousness_dutifulness: 0,
      conscientiousness_achievement: 0,
      conscientiousness_self_discipline: 0,
      conscientiousness_cautiousness: 0,

      extraversion: 0,
      extraversion_friendliness: 0,
      extraversion_gregariousness: 0,
      extraversion_assertiveness: 0,
      extraversion_activity: 0,
      extraversion_excitement: 0,
      extraversion_cheerfulness: 0,

      agreeableness: 0,
      agreeableness_trust: 0,
      agreeableness_morality: 0,
      agreeableness_altruism: 0,
      agreeableness_cooperation: 0,
      agreeableness_modesty: 0,
      agreeableness_sympathy: 0,

      neuroticism: 0,
      neuroticism_anxiety: 0,
      neuroticism_anger: 0,
      neuroticism_depression: 0,
      neuroticism_self_consciousness: 0,
      neuroticism_immoderation: 0,
      neuroticism_vulnerability: 0,
    },
  })

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call to save assessment
      toast.success('Big Five assessment saved!')
      reset()
    } catch {
      toast.error('Failed to save assessment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Big Five (OCEAN) Assessment</h1>
        <p className="mb-6 text-gray-700">
          Enter your scores for each trait and subcategory. Scores can be obtained from an external Big Five assessment.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Openness */}
          <div>
            <Label htmlFor="openness" className="text-gray-900">Openness</Label>
            <Input id="openness" type="number" {...register('openness', { valueAsNumber: true })} className="w-full text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Imagination" type="number" {...register('openness_imagination', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Artistic Interests" type="number" {...register('openness_artistic', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Emotionality" type="number" {...register('openness_emotionality', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Adventurousness" type="number" {...register('openness_adventurousness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Intellect" type="number" {...register('openness_intellect', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Liberalism" type="number" {...register('openness_liberalism', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            </div>
          </div>
          {/* Conscientiousness */}
          <div>
            <Label htmlFor="conscientiousness" className="text-gray-900">Conscientiousness</Label>
            <Input id="conscientiousness" type="number" {...register('conscientiousness', { valueAsNumber: true })} className="w-full text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Self-Efficacy" type="number" {...register('conscientiousness_self_efficacy', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Orderliness" type="number" {...register('conscientiousness_orderliness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Dutifulness" type="number" {...register('conscientiousness_dutifulness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Achievement-Striving" type="number" {...register('conscientiousness_achievement', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Self-Discipline" type="number" {...register('conscientiousness_self_discipline', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Cautiousness" type="number" {...register('conscientiousness_cautiousness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            </div>
          </div>
          {/* Extraversion */}
          <div>
            <Label htmlFor="extraversion" className="text-gray-900">Extraversion</Label>
            <Input id="extraversion" type="number" {...register('extraversion', { valueAsNumber: true })} className="w-full text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Friendliness" type="number" {...register('extraversion_friendliness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Gregariousness" type="number" {...register('extraversion_gregariousness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Assertiveness" type="number" {...register('extraversion_assertiveness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Activity Level" type="number" {...register('extraversion_activity', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Excitement-Seeking" type="number" {...register('extraversion_excitement', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Cheerfulness" type="number" {...register('extraversion_cheerfulness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            </div>
          </div>
          {/* Agreeableness */}
          <div>
            <Label htmlFor="agreeableness" className="text-gray-900">Agreeableness</Label>
            <Input id="agreeableness" type="number" {...register('agreeableness', { valueAsNumber: true })} className="w-full text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Trust" type="number" {...register('agreeableness_trust', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Morality" type="number" {...register('agreeableness_morality', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Altruism" type="number" {...register('agreeableness_altruism', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Cooperation" type="number" {...register('agreeableness_cooperation', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Modesty" type="number" {...register('agreeableness_modesty', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Sympathy" type="number" {...register('agreeableness_sympathy', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            </div>
          </div>
          {/* Neuroticism */}
          <div>
            <Label htmlFor="neuroticism" className="text-gray-900">Neuroticism</Label>
            <Input id="neuroticism" type="number" {...register('neuroticism', { valueAsNumber: true })} className="w-full text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Anxiety" type="number" {...register('neuroticism_anxiety', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Anger" type="number" {...register('neuroticism_anger', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Depression" type="number" {...register('neuroticism_depression', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Self-Consciousness" type="number" {...register('neuroticism_self_consciousness', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Immoderation" type="number" {...register('neuroticism_immoderation', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
              <Input placeholder="Vulnerability" type="number" {...register('neuroticism_vulnerability', { valueAsNumber: true })} className="text-white bg-gray-900 placeholder-gray-400" disabled={isLoading} />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow"
          >
            {isLoading ? 'Saving...' : 'Save Assessment'}
          </Button>
        </form>
      </div>
    </div>
  )
}