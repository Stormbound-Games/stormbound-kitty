import React from 'react'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
  Crowns,
  HeroCrowns,
} from '~/components/Resource'
import replaceInString from '~/helpers/replaceInString'

const iconify = input => {
  let output = input

  output = replaceInString(output, /(\d+)\scommon\scards?/g, (match, index) => (
    <Common amount={match} key={index} />
  ))

  output = replaceInString(output, /(\d+)\srare\scards?/g, (match, index) => (
    <Rare amount={+match} key={index} />
  ))

  output = replaceInString(output, /(\d+)\sepic\scards?/g, (match, index) => (
    <Epic amount={+match} key={index} />
  ))

  output = replaceInString(
    output,
    /(\d+)\slegendary\scards?/g,
    (match, index) => <Legendary amount={+match} key={index} />
  )

  output = replaceInString(output, /(\d+)\scoins?/g, (match, index) => (
    <Coins amount={+match} key={index} />
  ))

  output = replaceInString(output, /(\d+)\srub(?:y|ies)/g, (match, index) => (
    <Rubies amount={+match} key={index} />
  ))

  output = replaceInString(
    output,
    /(\d+)\sfusion\sstones?/g,
    (match, index) => <Stones amount={+match} key={index} />
  )

  output = replaceInString(output, /(\d+)\scrowns?/g, (match, index) => (
    <Crowns amount={match} key={index} />
  ))

  output = replaceInString(output, /(\d+)\shero\scrowns?/g, (match, index) => (
    <HeroCrowns amount={match} key={index} />
  ))

  return output
}

export default iconify
