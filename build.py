from staticjinja import Site

if __name__ == "__main__":
    notes = ['C','CSharp','D','DSharp','E','F','FSharp','G','GSharp','A','ASharp','B']
    variations = ['Major','Minor','Augmented','Diminished','Seventh','MajorSeventh','MinorSeventh','Sus2','Sus4','MinorMajorSeventh','DiminishedSeventh','MajorNinth','MinorNinth','AddNinth','AddEleventh','MinorSixth','MajorSixth','AddSixthAddNinth']
    context = {'notes': notes, 'variations' : variations, 'title': 'Chord Builder'}
    site = Site.make_site(contexts=[('index.html', context)])
    site.render()
