## This will work in the following order.

1. The document will be created in MongoDB with all the details for the item to be listed, save for url field where the images are to be stored.

2. The response to this API request will contain a status, and if that status is okay, the ObjectID of the listed item document.

3. Once the ObjectID arrives, the server (backend i developed) will attach that ObjectID string to the front of the file name, with the resulting URL also being updated in MongoDB to contain the URL's of the images for the item.

4. Initially will try with just one picture, and eventally have a carousell (however you spell it) that will cycle through the images.
