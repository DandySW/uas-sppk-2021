import eel
import pandas as pd

eel.init('web')


@eel.expose
def read_csv(csv_name):
    df = pd.read_csv(csv_name)
    print(df.info())
    # df
    # print("print nama: "+csv_name)
    return("return nama: "+csv_name)


eel.start('index.html')
