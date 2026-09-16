\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Nuvem de Gloria"
  %subtitle= ""
  composer= "Comunhão e Adoração"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/CPY_ZmpS86c"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key f \major
  
  \partial 8 f16 g \bar "||"
  \mark "Intro"
  a8.[ c16]~8[ g8]~8[ c8]~8[ e,16 f] g8. a16~8 f8~2
  bes,8 a16 bes c8 f16 c d4 a'8 f g2. r8 f16 g \break
  a8.[ c16]~8[ g8]~8[ c8]~8[ e,16 f] g8. a16~8 f8~2
  bes8 a16 bes c8 f16 c d4 a'8 f g1 \break

  % A
  \md
  \bar "||"
  \repeat unfold 7 \empty
  \time 2/4 \halfEmpty \time 4/4
  \improvisationOn
    \hide Stem
      b,4 4 4
    \undo \hide Stem
    b8 8
  \improvisationOff

  %B
  \break
  \bar "||"
  \md
  \improvisationOn
    \hide Stem
      b4 4 4
    \undo \hide Stem
    b8 8(

    \hide Stem
      b4) 4 4
    \undo \hide Stem
    b8 8
    \hide Stem
      b4 4 4
    \undo \hide Stem
    b8 8(

    \hide Stem
      b4) 4 4 4
    \undo \hide Stem
  \improvisationOff
  \repeat unfold 3 \empty
  \break

  %C
  \break
  \bar "||"
  \md
  \empty \empty
  \break

  % D
  \md
  \bar "||"
  \repeat unfold 7 \empty
  \time 2/4 \halfEmpty \time 4/4
  \improvisationOn
    \hide Stem
      b4 4 4
    \undo \hide Stem
    b8 8
  \improvisationOff

  %E
  \break
  \md
  \repeat volta 2 {
    \improvisationOn
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8(

      \hide Stem
        b4) 4 4
      \undo \hide Stem
      b8 8
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8(

      \hide Stem
        b4) 4 4 4
      \undo \hide Stem
    \improvisationOff
    \repeat unfold 3 \empty
  } \alternative {
    \volta 1 {
      \improvisationOn
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8
      \improvisationOff
    }
    \volta 2 {
      \empty
      \bar "||"
    }
  }
  \break

  % F
  \md
  \repeat percent 3 {\empty \emptyAnt}
  \empty \empty
  \key fis \major
  \bar "||"
  \improvisationOn
    \hide Stem
      b4 4 4
    \undo \hide Stem
    b8 8
  \improvisationOff

  %G
  \break
  \md
  \repeat volta 2 {
    \improvisationOn
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8(

      \hide Stem
        b4) 4 4
      \undo \hide Stem
      b8 8
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8(

      \hide Stem
        b4) 4 4 4
      \undo \hide Stem
    \improvisationOff
    \repeat unfold 3 \empty
  } \alternative {
    \volta 1 {
      \improvisationOn
      \hide Stem
        b4 4 4
      \undo \hide Stem
      b8 8
      \improvisationOff
    }
  }
  \break

  \md
  \repeat percent 2 {\empty \empty}
  \empty \improvisationOn b1\fermata \improvisationOff \bar "|."
  


}

harmony = \chordmode {

  % Intro
  s8
  f4. c8/e~2 c4.:m7/ees bes8/d~2 g4:m7 f/a b2:m7.5- bes1/c
  f4. c8/e~2 c4.:m7/ees bes8/d~2 g4:m7 f/a b2:m7.5- bes1/c

  % A
  f2:maj7 d:m7 g:m7 bes/c f:maj7 d:m7 g:m7 bes4/c cis:dim7
  d2:m7 d:m7+/ces d:m7/c b:m7.5- g:m7 f/a bes c:sus4 c4 bes8 f/a

  % B
  g4:m7 f/a bes d8:m7 c8:sus4~2 c4 bes8 f/a
  g4:m7 f/a bes d8:m7 c8:sus4~2 cis2:dim7
  d2:m7 bes:m6/cis f/c g/b
  g4:m7 f/a bes bes/c
  
  % C
  bes1/f f2 bes4/d c/e

  % D
  f2:maj7 d:m7 g:m7 bes4/c g:m7 a2:m7 d:m7 g:m7 bes4/c cis:dim7
  d2:m7 d:m7+/ces d:m7/c b:m7.5- g:m7 f/a bes c:sus4 c4 bes8 f/a

  % E
  \repeat volta 2 {
    g4:m7 f/a bes d8:m7 c8:sus4~2 c4 bes8 f/a
    g4:m7 f/a bes d8:m7 c8:sus4~2 cis2:dim7
    d2:m7 bes:m6/cis f/c g/b
    g4:m7 f/a bes bes/c
  } \alternative {
    \volta 1 {bes2/f f4 bes8 f/a}
    \volta 2 {bes2/f f}
  }

  % F
  \repeat percent 3 {cis2:maj7 ees ees4./f f8~2}
  cis2:maj7 ees bes1/c b2./cis b8 fis/ais

  % G
  \repeat volta 2 {
    gis4:m7 fis/ais b dis8:m7 cis8:sus4~2 cis4 b8 fis/ais
    gis4:m7 fis/ais b dis8:m7 cis8:sus4~2 d:dim7
    dis2:m7 b:m6/d fis/cis gis/c
    gis4:m7 fis/ais b b/cis 
  } \alternative {
    \volta 1 {b2/fis fis4 b8 fis/ais}
    \volta 2 {fis2 dis:m7 gis4:m7 fis/ais b b/cis}
  }

  s1*2 b1/fis fis

}

\score {
  <<
    \new ChordNames {
      \set additionalPitchPrefix = #"add"
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      %\tempo "Adagietto" 4 = 64
      \melody
    }
  >>
  \layout{}
  \midi{}
}