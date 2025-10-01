/**
 * Change the behaviour here so that it 
loops through each subdirectory inside lili/
for each subdirectory X
    for each file Y in X
        if slug is index.md
            index.md = file O
        if slug is X.md, or X_en.md, or X_sp.md
    end for
    line match tok/en/sp into three arrays using existing pattern matching logic

    assign the newly formed arrays as tags 'en', 'tok' and 'sp' in O
endfor*/